<template>
    <div>
        <div class="text-center">
            <h1 class="section-title">Teste TOPi</h1>
            <p>Essa aplicação tem a finalidade de exibir uma grade com os repositórios mais marcados de uma linguagem no github.</p>
        </div>
        <div class="row">
            <div class="col-lg-8 col-md-12 col-sm-12 mx-auto repositories-list">
                <div class="form-row">
                    <div class="form-group col-lg-4 col-md-8 col-sm-12 col-12 search">
                        <label for="language">Linguagem:</label>
                        <input class="form-control" id="language" v-model="language" placeholder="Pesquisa">
                        <button class="btn btn-primary" @click="searchLanguage()">Pesquisar</button>
                    </div>
                    <div class="form-group form-group__center col-lg-4 col-md-6 col-sm-6 col-6">
                        <select v-model="sort" class="custom-select form-control">
                            <option disabled selected value="">Ordenar por</option>
                            <option value="updated">Data de atualização</option>
                            <option value="stars">Estrelas</option>
                            <option value="forks">Cópias</option>
                        </select>
                    </div>
                    <div class="form-group form-group__flex-end col-lg-4 col-md-6 col-sm-6 col-6">
                        <label>
                            Resultados por página:
                            <select v-model="per_pages" class="custom-select form-control">
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div v-if="repositories.hasOwnProperty('items')">
                    <div class="card" v-for="n in this.page" :key="n">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-4 col-6 img-user">
                                    <a :href="repositories.items[n - 1 + index].owner.html_url" target="_blank">
                                        <figure>
                                            <img :src="repositories.items[n - 1 + index].owner.avatar_url" alt="Logo user">
                                        </figure>
                                    </a>
                                </div>
                                <div class="col-lg-8 col-6 inf-user">
                                    <a class="repository-name" :href="repositories.items[n - 1 + index].html_url" target="_blank">{{ repositories.items[n - 1 + index].owner.login }} / <strong>{{ repositories.items[n - 1 + index].name }}</strong></a>
                                    <p>{{ repositories.items[n - 1 + index].description }}</p>
                                    <div class="counts">
                                        <a :href="repositories.items[n - 1 + index].html_url + '/stargazers'" target="_blank"><span class="far fa-star"></span>{{ repositories.items[n - 1 + index].stargazers_count }}</a>
                                        <a :href="repositories.items[n - 1 + index].html_url + '/network/members'" target="_blank"><span class="fas fa-code-branch"></span>{{ repositories.items[n - 1 + index].forks }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group pagination">
                        <button class="btn btn-primary" id="previous" @click="previous()"><span class="fas fa-angle-left"></span></button>   
                        <button class="btn btn-primary" id="next" @click="next()"><span class="fas fa-angle-right"></span></button>
                    </div>
                </div>
                <div v-else>
                    <div class="card">
                        <div class="card-body">
                            <div class="row error">
                                Nenhum resultado encontrado
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jQuery from 'jquery';
import $ from 'jquery';
import axios from 'axios';

export default {
    name: 'MolTable',
    data() {
        return {
            language: "",
            per_pages: "10",
            per_page: "",
            page: 10,
            sort: "",
            repositories: [],
            index: 0
        }
    },
    methods: {
        async searchLanguage() {
            await axios.get('https://api.github.com/search/repositories?q=language:'+ this.language + '&sort=' + this.sort + '&per_page=100' + '&page=1').then((response) => {
                this.repositories = response.data;
            }).catch(errors => this.repositories = errors)
        },
        pagination() {
            let pagination = parseInt(this.per_pages);
            this.page = pagination;

            if(this.index + this.page == 100) {
                document.getElementById("next").disabled = true;
                document.getElementById("previous").disabled = true;
            }
            else if(pagination - this.page <= 0) {
                document.getElementById("previous").disabled = true;
                document.getElementById("next").disabled = false;
            }

            if(pagination == 10) {
                this.index = 0;
            }
            else if(pagination == 20) {
                this.index = 0;
            }
            else if(pagination == 50) {
                this.index = 0;
            }
            else {
                this.index = 0;
                document.getElementById("next").disabled = true;
            }
        },
        next() {
            let pagination = parseInt(this.per_pages);

            setTimeout($('html, body').animate({scrollTop:0}, 'slow'), 3000);
            this.page = parseInt(this.per_pages)

            if(pagination == 10) {
                this.index += 10;
            }
            else if(pagination == 20) {
                this.index += 20;
            }
            else if(pagination == 50) {
                this.index += 50;
            }

            if(this.index + pagination == 100) {
                document.getElementById("next").disabled = true;
            }
            if(this.index - pagination >= 0) {
                document.getElementById("previous").disabled = false;
            }
        },
        previous() {
            let pagination = parseInt(this.per_pages);

            this.index -= pagination;
            setTimeout($('html, body').animate({scrollTop:0}, 'slow'), 3000);

            if (this.index - pagination < 0) {
                document.getElementById("previous").disabled = true;
            }
            if (this.index != 100) {
                document.getElementById("next").disabled = false;
            }
        },
    },
    watch: {
        per_pages: function () {
            this.pagination();
        },
        sort: function () {
            this.searchLanguage();
        },
    },
    created: function() {
        Promise.all([
            this.searchLanguage()
        ]).then(() => {
            this.pagination()
        });
    },
}
</script>

<style lang="scss">
    .text-center {
        margin: 50px 0;
        
        p {
            font-size: 20px;
        }
    }
    .row {
        .repositories-list {
            .form-group {
                display: flex;
                flex-wrap: wrap;
                align-items: flex-end;
                justify-content: space-between;

                label {
                   margin: 0;

                    select {
                        width: 30%;
                    }
                }

                label {
                    width: 100%;
                }

                input {
                    width: 55%;
                }

                &__center {
                    justify-content: center;
                    select {
                        height: 38px;
                        width: 80%;
                    }
                }
            }
            .card {
                margin-bottom: 25px;

                figure {
                    margin: 0;
                    img {
                        height: 120px;
                        width: 120px;
                        border-radius: 92px;
                    }
                }

                .img-user {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid #00000020;
                }
                .inf-user {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    p {
                        max-height: 150px;
                        overflow: hidden;
                    }

                    .repository-name {
                        font-size: 20px;
                    }
                    
                    .counts {
                        display: flex;
                        
                        a {
                            margin: 0 35px 0 0;
                            color: #6C757D;
                            text-decoration: none;

                            span {
                                margin-right: 5px;
                            }
                        }
                    }
                }
                .error {
                    justify-content: center;
                }
            }
            .pagination {
                display: flex;
                justify-content: flex-end;

                button {
                    margin-left: 15px;
                }
            }
            @media(max-width: 991px) {
                .search {
                    justify-content: flex-start;
                    align-items: center;
                    margin: 0 0 15px 0;

                    label {
                        width: auto;
                        margin-right: 15px;
                    }
                    .form-control {
                        margin-right: 15px;
                    }
                }

                .form-group {
                    &__center {
                        justify-content: flex-start;
                    }
                    &__flex-end {
                        justify-content: flex-end;

                        label {
                            width: 70%;
                        }
                    }
                }
            }
            @media(max-width: 767px) {
                .form-group {
                    &__flex-end {
                        label {
                            width: 95%;
                        }
                    }
                }
            }
            @media(max-width: 575px) {
                .form-group {
                    &__flex-end {
                        label {
                            width: 89%;
                        }
                    }
                }
            }
        }
    }
</style>