# twentytwenty-child-react
This is a child theme for twenty twenty WordPress theme which demonstrates basic ReactJS based app using WPScripts package from WordPress. It fetches posts from the REST API and displays on the front page.

## Installation 
1. Download the folder and it to wp-themes directory
2. Make sure you have the original Twenty Twenty theme installed
3. Inside build/index.js, change the following code
```javascript
const postsUrl = "http://localhost:8888/towa-trial/wp-json/wp/v2/posts";
const categoriesUrl = "http://localhost:8888/towa-trial/wp-json/wp/v2/categories";
```
change these URLs to the URLs of your WP installation.

4. Activate the child theme 

## License
MIT](https://choosealicense.com/licenses/mit/)
