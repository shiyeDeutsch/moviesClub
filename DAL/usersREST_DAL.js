const axios = require('axios');
let users = {
                user: [ 
                        { username: 'shua', pwd: 'qwe123' },
                        { username: 'shalom', pwd: '1234' }, 
                        { username: 'bluma', pwd: '09876' }
                    ]
           }
           exports.getUsers=()=>{
               return users;
           }
           exports.getAPIUsers=(id='')=>{
               return axios.get('https://jsonplaceholder.typicode.com/users/'+id);
           }
       