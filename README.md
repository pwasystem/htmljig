# HTML JIG
## Create your website with AI

### How to

- Clone this repository.

> git clone https://github.com/pwasystem/htmljig.git


- Make **npm install** on *functions* directory.
- Change .env fire in functions folder with text:

> GEMINIKEY=(youy gemini api key)

- Modify **.firebaserc** with your project name.
- Run **firebase emulators:start**.
- Access your localhost domain at **http://127.0.0.1:5000/jig.html**.
- Fill in the form fields:

> **File name**: name for the .html file.<br>
> **Title**: name of your company or page title.<br>
> **Description**: information about your company and suggestions for colors and topics for the site.<br>
> **Template**: Select a model to be used as a template.<br>
> **Images**: send some image links.

- Create your site and wait.
- View your creation.
- Suggest changes to your site or **firebase deploy --only hosting** it.
