const { createApp, ref } = Vue;

createApp({
  data() {
    return {
        phone: null,
        email: null,
        name: null,
        password: null,
        user: null,
        password_confirmation: null,
        errorMsg: "",
        showMorePopUp: false,
        login_email: null,
        login_password: null
    }
  },
  methods: {
    setCookie(name, value, days) {
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
      
        var expires = "expires=" + expirationDate.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },  
    checkCookie(cookieName) {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(`${cookieName}=`) === 0) {
            return true; // Found 'user_token' cookie
        }
        }
        return false; // 'user_token' cookie not found
    },
    getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
      
        for(let i = 0; i < cookieArray.length; i++) {
          let cookie = cookieArray[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return "";
      },          
    async register(name, email, phone, password, password_confirmation) {
        if (!name) {
            document.getElementById('errors').innerHTML = ''
            let error = document.createElement('div')
            error.classList = 'error'
            error.innerHTML = " الاسم مطلوب"
            document.getElementById('errors').append(error)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()
            setTimeout(() => {
                $('input').css('outline', 'none')
                $('#errors').fadeOut('slow')
                $('.loader').fadeOut()
            }, 3500);
        } 
        else if (!email) {
            document.getElementById('errors').innerHTML = ''
            let error = document.createElement('div')
            error.classList = 'error'
            error.innerHTML = "البريد الالكتروني مطلوب"
            document.getElementById('errors').append(error)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()
            setTimeout(() => {
                $('input').css('outline', 'none')
                $('#errors').fadeOut('slow')
                $('.loader').fadeOut()
            }, 3500);
        } 
        else if (!phone) {
            document.getElementById('errors').innerHTML = ''
            let error = document.createElement('div')
            error.classList = 'error'
            error.innerHTML = "رقم الهاتف مطلوب"
            document.getElementById('errors').append(error)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()
            setTimeout(() => {
                $('input').css('outline', 'none')
                $('#errors').fadeOut('slow')
                $('.loader').fadeOut()
            }, 3500);
        } 
        else if (!password) {
            document.getElementById('errors').innerHTML = ''
            let error = document.createElement('div')
            error.classList = 'error'
            error.innerHTML = "كلمة المرور مطلوبة"
            document.getElementById('errors').append(error)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()
            setTimeout(() => {
                $('input').css('outline', 'none')
                $('#errors').fadeOut('slow')
                $('.loader').fadeOut()
            }, 3500);
        } 
        else if (!password_confirmation) {
            document.getElementById('errors').innerHTML = ''
            let error = document.createElement('div')
            error.classList = 'error'
            error.innerHTML = "تاكيد كلمة المرور مطلوبة"
            document.getElementById('errors').append(error)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()
            setTimeout(() => {
                $('input').css('outline', 'none')
                $('#errors').fadeOut('slow')
                $('.loader').fadeOut()
            }, 3500);
        } 
        else {
            $('.loader').fadeIn().css('display', 'flex')
            if (password == password_confirmation)
                try {
                    const response = await axios.post( `https://admin.nadymama.com/api/users/register`, {
                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                        password_confirmation: password_confirmation,
                    }, {
                        headers: {
                            "lang": this.lang
                        }
                    }
                    );
                    $('.loader').fadeOut()
                    if (response.data.status === true) {
                        sessionStorage.setItem('user_token', response.data.data.token)
                        this.setCookie('user_token', response.data.data.token, 30)
                        document.getElementById('errors').innerHTML = ''
                        let error = document.createElement('div')
                        error.classList = 'success'
                        error.innerHTML = response.data.message
                        document.getElementById('errors').append(error)
                        $('#errors').fadeIn('slow')
                        setTimeout(() => {
                            $('#errors').fadeOut('slow')
                            window.location.href = '/';
                        }, 4000);
                    } else {
                        document.getElementById('errors').innerHTML = ''
                        $.each(response.data.errors, function (key, value) {
                            let error = document.createElement('div')
                            error.classList = 'error'
                            error.innerHTML = value
                            document.getElementById('errors').append(error)
                        });
                        $('#errors').fadeIn('slow')
                        
                        setTimeout(() => {
                            $('input').css('outline', 'none')
                            $('#errors').fadeOut('slow')
                        }, 3500);
                    }

                } catch (error) {
                    document.getElementById('errors').innerHTML = ''
                    let err = document.createElement('div')
                    err.classList = 'error'
                    err.innerHTML = 'server error try again later'
                    document.getElementById('errors').append(err)
                    $('#errors').fadeIn('slow')
                    $('.loader').fadeOut()

                    setTimeout(() => {
                        $('#errors').fadeOut('slow')
                    }, 3500);

                    console.error(error);
                }
            else {
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'error'
                error.innerHTML = 'كلمة المرور والتاكيد غير متطابقان'
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                }, 3500);
            }
        }
    },
    async getUser() {
        var hasUserTokenCookie = this.checkCookie('user_token');
        if (hasUserTokenCookie) {
            sessionStorage.setItem('user_token', this.getCookie('user_token'))
        }
        let user_token = sessionStorage.getItem('user_token')
        if (user_token) {
            $('.loader').fadeIn().css('display', 'flex')
            try {
            const response = await axios.get('https://admin.nadymama.com/api/users/getProfile',
            {
                headers: {
                    'AUTHORIZATION': `Bearer ${user_token}`
                }
            },
                );
                $('.loader').fadeOut()
                if (response.data.status === true) {
                    this.user = response.data.data
                } else {
                    return false;
                }
                
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    },
    destroyAllCookies() {
        var cookies = document.cookie.split(";");
      
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    },
    async login(phone, password) {
        $('.loader').fadeIn().css('display', 'flex')
        try {
            const response = await axios.post(`https://admin.nadymama.com/api/users/login`, {
                email: phone,
                password: password,
            },
            );
            if (response.data.status === true) {
                sessionStorage.setItem('user_token', response.data.data.token)
                this.setCookie('user_token', response.data.data.token, 30)
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = response.data.message
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('.loader').fadeOut()
                    $('#errors').fadeOut('slow')
                    console.log(response.data)
                    if (response.data.data.verified == 1) {
                        window.location.href = '/'
                    } else{
                        window.location.href = '/'
                    }
                }, 1300);
            } else {
                $('.loader').fadeOut()
                document.getElementById('errors').innerHTML = ''
                $.each(response.data.errors, function (key, value) {
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = value
                    document.getElementById('errors').append(error)
                });
                $('#errors').fadeIn('slow')
                
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            }

        } catch (error) {
            document.getElementById('errors').innerHTML = ''
            let err = document.createElement('div')
            err.classList = 'error'
            err.innerHTML = 'server error try again later'
            document.getElementById('errors').append(err)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()

            setTimeout(() => {
                $('#errors').fadeOut('slow')
            }, 3500);

            console.error(error);
        }
    },  
    async logout() {

        $('.loader').fadeIn().css('display', 'flex')
        try {
            const response = await axios.post(`https://admin.nadymama.com/api/users/logout`, {
            },
                {
                    headers: {
                        "AUTHORIZATION": 'Bearer ' + sessionStorage.getItem('user_token')
                    }
                },
            );
            if (response.data.status === true) {
                this.destroyAllCookies()
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('user_token')
                document.getElementById('errors').innerHTML = ''
                let error = document.createElement('div')
                error.classList = 'success'
                error.innerHTML = response.data.message
                document.getElementById('errors').append(error)
                $('#errors').fadeIn('slow')
                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                    $('.loader').fadeOut()
                    window.location.href = "/";
                }, 1000);
            } else {
                $('.loader').fadeOut()
                document.getElementById('errors').innerHTML = ''
                $.each(response.data.errors, function (key, value) {
                    let error = document.createElement('div')
                    error.classList = 'error'
                    error.innerHTML = value
                    document.getElementById('errors').append(error)
                });
                $('#errors').fadeIn('slow')
                
                setTimeout(() => {
                    $('input').css('outline', 'none')
                    $('#errors').fadeOut('slow')
                }, 3500);
            }

        } catch (error) {
            document.getElementById('errors').innerHTML = ''
            let err = document.createElement('div')
            err.classList = 'error'
            err.innerHTML = 'server error try again later'
            document.getElementById('errors').append(err)
            $('#errors').fadeIn('slow')
            $('.loader').fadeOut()

            setTimeout(() => {
                $('#errors').fadeOut('slow')
            }, 3500);

            console.error(error);
        }
    },
  },
  created() {
    this.getUser()
  }
}).mount('body')
