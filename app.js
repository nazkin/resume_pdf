const GitHub = require('github-api');
const options = { format: 'Letter' };
const pdf = require('html-pdf');
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      name: 'backgroundColor',
      message: 'What background color do you want?',
    },
  ])
  .then(answer => {
    const gh = new GitHub({
      username: 'nazkin',
      password: '' // need to change 
      
   });
   console.log(answer.backgroundColor);
  
   const myGitHub = gh.getUser();
  
   myGitHub.getProfile((err, user)=>{
       if(err){
           console.log(err);
       } else{
           //Required variables
           const gitUser = {
               fullName : user.name,
               avatar : user.avatar_url,
               bio : user.bio,
               publicRepos : user.public_repos,
               followers : user.followers,
               following : user.following,
               accountLink : user.html_url,
               blogLink : user.blog,
               locationLink : user.location
           }
           console.log(gitUser);
  
           let createHtml = 
           `<html>
              <head>
               
              </head>
              <body style = "background-color:${answer.backgroundColor}">
                <div style="text-align: center">
                  <h1>${gitUser.fullName}</h1>
                  <img src=${gitUser.avatar}>
                  <h2>Biography</h2>
                  <p>${gitUser.bio}</p>
                  <table style = "width: 100%; text-align: center;">
                    <tr>
                      <th>Repositories</th>
                      <th>Followers</th>
                      <th>Following</th>
                    </tr>
                    <tr>
                      <td>${gitUser.publicRepos}</td>
                      <td>${gitUser.followers}</td>
                      <td>${gitUser.following}</td>
                    </tr>  
                  </table>
                  <ul style="list-style: none">
                    <li><a href=${gitUser.accountLink}>Account</a></li>
                    <li><a href=${gitUser.blogLink}>Blog</a></li>
                    <li><a href=${gitUser.locationLink}>Location</a></li>
                  </ul>
                </div>
              </body>
           </html>
           
           `;
      
             pdf.create(createHtml, options).toFile(`./${gitUser.fullName}.pdf`, function(err, res) {
               if(err){
                 console.log(err);
               }
                console.log(res); 
               });  
        
       }
       
   });
  });

