# HTML JIG
## Create your website with AI

### How to

- Clone this repository.
> git clone https://github.com/pwasystem/htmljig.git

- Rename the HTMLjig folder to your Firebase project name.

- Modify the contents of the **.firebaserc** file with your project name.
>     {
> 
>       "projects": {
> 
>         "default": "your_project_name"
> 
>       }
> 
>     }

- Change .env fire in functions folder with text:
> GEMINIKEY=<b>(youy gemini api key)</b>


- Modify the action value in the form of the file available at public/jig.html to:
> action='http://127.0.0.1:5001/<b>(your_project_name)</b>/us-central1/htmljig'.

- Make **npm install** on *functions* directory.

- Run **firebase emulators:start**.
- 
- Access your localhost domain at **http://127.0.0.1:5000/jig.html**.


- Fill in the form fields:

> **File name**: name for the .html file.
> 
> **Title**: name of your company or page title.
> 
> **Description**: information about your company and suggestions for colors and topics for the site.
> 
> **Template**: Select a model to be used as a template.
> 
> **Images**: send some image links.

- Click to create your website and wait.

- View your creation.

- Suggest changes to your site through the description field or publish your site:
> **firebase deploy --only hosting**.
