<template>
  <h1 v-if="submitted" class="text-success">Login success</h1>
  <div id="logreg-forms">
    <form class="form-signin" @submit="login" method="POST">
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">
        Sign in
      </h1>
      <div class="social-login">
        <button class="btn facebook-btn social-btn" type="button">
          <span><i class="fab fa-facebook-f"></i> Sign in with Facebook</span>
        </button>
        <button class="btn google-btn social-btn" type="button">
          <span><i class="fab fa-google-plus-g"></i> Sign in with Google+</span>
        </button>
      </div>
      <p style="text-align:center">OR</p>
      <input
        type="text"
        id="inputEmail"
        class="form-control"
        placeholder="User Name"
        required=""
        autofocus=""
        v-model="user.username"
        name="username"
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required=""
        v-model="user.password"
        name="password"
      />

      <button class="btn btn-success btn-block" @click="saveUser">
        <i class="fas fa-sign-in-alt"></i> Sign in
      </button>
      <a href="#" id="forgot_pswd">Forgot password?</a>
      <hr />
    </form>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username,
        password: this.user.password
      };
      UserService.userLogin(data)
        .then(response => {
          var data = response.data;
          this.submitted = data.success;
          if (data.success) {
            localStorage.setItem("user", data.data["access-token"]);
            this.$router.push("/");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    login(event) {
      event.preventDefault();
    }
  }
};
</script>

<style>
/* sign in FORM */
#logreg-forms {
  width: 412px;
  margin: 10vh auto;
  background-color: #f3f3f3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
#logreg-forms form {
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: auto;
}
#logreg-forms .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
#logreg-forms .form-control:focus {
  z-index: 2;
}
#logreg-forms .form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#logreg-forms .social-login {
  width: 390px;
  margin: 0 auto;
  margin-bottom: 14px;
}
#logreg-forms .social-btn {
  font-weight: 100;
  color: white;
  width: 190px;
  font-size: 0.9rem;
}

#logreg-forms a {
  display: block;
  padding-top: 10px;
  color: lightseagreen;
}

#logreg-form .lines {
  width: 200px;
  border: 1px solid red;
}

#logreg-forms button[type="submit"] {
  margin-top: 10px;
}

#logreg-forms .facebook-btn {
  background-color: #3c589c;
}

#logreg-forms .google-btn {
  background-color: #df4b3b;
}

#logreg-forms .form-reset,
#logreg-forms .form-signup {
  display: none;
}

#logreg-forms .form-signup .social-btn {
  width: 210px;
}

#logreg-forms .form-signup input {
  margin-bottom: 2px;
}

.form-signup .social-login {
  width: 210px !important;
  margin: 0 auto;
}

/* Mobile */

@media screen and (max-width: 500px) {
  #logreg-forms {
    width: 300px;
  }

  #logreg-forms .social-login {
    width: 200px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  #logreg-forms .social-btn {
    font-size: 1.3rem;
    font-weight: 100;
    color: white;
    width: 200px;
    height: 56px;
  }
  #logreg-forms .social-btn:nth-child(1) {
    margin-bottom: 5px;
  }
  #logreg-forms .social-btn span {
    display: none;
  }
  #logreg-forms .facebook-btn:after {
    content: "Facebook";
  }

  #logreg-forms .google-btn:after {
    content: "Google+";
  }
}
</style>