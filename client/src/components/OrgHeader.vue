<template>
    <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="/home">
          <figure>
              <img src="../assets/img/favicon.png" alt="" class="logo">
          </figure>
        </a>
    </nav>
</template>
<script>
export default {
    name: "OrgHeader",
}
</script>

<style lang="scss">
  .navbar {
    .navbar-brand {
      display: block;
      width: 100px;
      height: 35px;
      margin: 0;
      padding: 0;
      figure {
        margin: 0;

        .logo {
          width: 100%;
          height: 100%;
        }
      }
    }
    .dropdown {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        figure {
          margin: 0;
          width: 30px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .dropdown-menu {
        min-width: 100%;
        background: #5C646B;

        a {
          margin: 0;
          padding: 0;
          
          &:hover {
            background: #5C646B;
          }
        }
      }
    }
  }
</style>