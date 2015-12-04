#### Features
A tab system compatible with screenreaders NVDA and JAWS in Firefox and Internet Explorer.

#### Prerequisites
Needs jQuery (1.11.3) tested


#### Installation
1. Download the zip and place its contents where you want to use them

2. Open a command prompt and navigate to the folder where gulpfile.js lies.

3. Next, install the npm dependencies. Type the following in your command prompt and hit enter:
  ```shell
    npm install
  ```

4.  Now's the time to set your options. You can find them under `gulp/options.js`. Be sure to set `destination` and `webroot` variables to your liking, these are the most important.

5.  To initially build your assets, create the folder structure and test the installation, run:
  ```shell
    gulp stage
  ```

6. If `gulp stage` finished without errors, you are good to go. Run `gulp` to start developing:
  ```shell
    gulp
  ```
