# HTML JIG
## Create your website with AI

### How to:
1. Clone this repository.
>     git clone https://github.com/pwasystem/htmljig.git

2. Rename the HTMLjig folder to your Firebase project name.
  
3. Modify the contents of the **.firebaserc** file with your project name.
>     {
> 
>       "projects": {
> 
>         "default": "your_project_name"
> 
>       }
> 
>     }

4. Change .env fire in functions folder with text:
>     GEMINIKEY=<b>(youy gemini api key)</b>


5. Modify the action value in the form of the file available at public/jig.html to:
>     action='http://127.0.0.1:5001/<b>(your_project_name)</b>/us-central1/htmljig'.

6. install the script dependencies in the functions directory.
>     npm install

7. Start Firebase emulator:
>     firebase emulators:start

8. Access your localhost domain at **http://127.0.0.1:5000/jig.html**.

9. Fill in the form fields:

> **File name**: name for the .html file.
> 
> **Title**: name of your company or page title.
> 
> **Description**: information about your company and suggestions for colors and topics for the site.
> 
> **Template**: Select a model to be used as a template.
> 
> **Images**: send some image links.

10. Click to create your website and wait.

11. Click on the link and see your creation.

12. Suggest changes to your site through the description field or publish your site:
>     **firebase deploy --only hosting**.
