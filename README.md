# Kelsafy
### [Live Preview](http://kelsafy.com)

It is portfolio website based on angularjs + bootstrap + php/mysql.

This website is originally made for fun to practice AngularJS But it turned out to be cool, having my portfolio online, and any one can fork the project from github, replace your info and contacts in 2-3 small files, create mysql database, fill your experience/projects/skills/links between them, put the database connection in the file and you will have full website with your info/experience/skills and sample projects with screenshots!



#### What is cool here:
So you may be wondering, I have a linkedin profile why I do this?

The answer would be:
 * You will have a website for your portfolio organized in a cool way, which is appreciated in your resume.
 * The really cool thing here is the links between your skills and your projects where people/recruiters can view how many projects you did with a certain skill/programming language.
 * It will just cost you couple of hours to have your website ready.
 
 
#### Website Pages:

 * First page which have a picture for you and short words about you.
 * Experience page with your education info and places you worked/works for with link to list projects for each company.
 * Projects page which list your projects with count and link to the skills/languages used in this project.
 * Skills page which list your skills whith the percent of how much you are good at it, count and link to the projects did with this skill.
 * Contact Me page which have a form that any one can send you an email.
 * Reviews page which have screenshots for the reviews by the clients or co-workers.
 * About Website page that have a description for every thing.

#### What's next?
 
 * Blog!
 * admin console to manage(add/update/delete) your data instead of doing this from the database.
 * may be turning this to website where people can register and go to their admin console and have their website as subdomain like mark.kelsafy.com without worrying about deploying/manage your website.

#### Credits
 
 * [Stanley template] (http://www.blacktie.co/demo/stanley) for the index page.
 * [AngularJS Contact Form with Bootstrap and PHPMailer] (http://www.chaosm.net/blog/2014/05/21/angularjs-contact-form-with-bootstrap-and-phpmailer/) for contact me page.

## HOW TO USE

1) Fork/clone the project.
2) Edit the Json files under assets/data with your info/contacts.
3) Now the time for the database run the sql file "kelsafy_db.sql" under assets/mysql to create the tables.
4) Now put the database connection in "config.php" under backend/config.
```php
<?php
$dbhost='localhost';
$dbusername='yourusername';
$dbuserpass='yourpassword';
$dbname = 'yourdatabasename';
?>
```
5) fill your skills table with 3 params: name-image name(and put your image under "assets/img/skills") and the percentage (number from 0 to 100 indicating how good are you in this skill).

6) fill your experience table from old to newest with params: company name - company image(also put it under "assets/img/experience") - title - location - details - start and end date.

7) fill your projects table with params: name - image (put the image under "assets/img/projects" - short description - functionality and your role - start and end data - also the company id that points to the company that you did this project at, then get the id of the project and do the next two steps 8,9 with it.

8) for each project id: if you have screenshots for the project put them under "assets/img/projects/{projectId}". 

9) for each project id: fill the table projects_skills that have the links between this project and skills that have 2 params: the project id and the skill id, one record for each skill.

10) put screenshots for your reviews under "assets/img/reviews".

11) Now deploy the project if you are asking for free web hosting websites contact me.
