# Assignment 1:  Different Architectures

This is a three part assignment where you will implement a simple VR experience in three different programming environments: Babylon.js, Playcanvas, and A-Frame.

The goal of the assignment is to have you gain experience with three very different architectures, and to reflect on these differences.  [Babylon.js](https://babylonjs.org) is an object-hierarchy architecture, similar to other systems like three.js and numerous non-web graphics libraries.  [Playcanvas](https://playcanvas.com) uses an Entity-Component architecture, similar to Unity, Unreal, and other game engines.  [A-Frame](https://aframe.io) is a mix of the two, and is implement using custom DOM elements so that the scene graph sits in the HTML page.

This repository is for the first of the three parts of the assignment, where you will use Babylon.js.

# Assignment 1(a):  Babylon.js VR Experience 

This is a skeleton, based on some of the Babylon examples, of a small project that will let you build, debug, and run Babylon applications locally.

In addition to building a simple VR application using Babylon.js, you will also have the opportunity to learn how to run and debug WebXR applications on your VR device.

## Due: Friday September 23, 11:59am (noon)

## Name and GT user-id

Name: 
User ID:

## Rubric

Graded out of 5.

Each of the parts to be added are discussed in one of the lessons in the [Babylon 101](https://doc.babylonjs.com/babylon101/) tutorial.

0. Ensure your program builds with no Typescript warnings. (1)
2. Add a 2D GUI panel attached to the left controller that has a color picker and two buttons ("cube" and "sphere"). (1)
3. When you click, create a cube or sphere as described below, with the correct color. (2)
4. Pressing the grip button on the controller with the menu erases all the objects created. (1)

Up to 2 additional bonus points will be given for some of the following (1 bonus each):
- add a slider to the GUI to control the size of the object created.
- add a second GUI panel, perpendicular to the first (the "second side of a cube") and move the two buttons there.  Add at least 2 more objects that can be created and include buttons for them in the panel.
- allow cubes to be created when you click on a sphere.  The cube needs to be oriented and positioned so the center of one face is just touching the point on the sphere where you clicked.
- suggest something else you'd like to do of similar complexity.

## Overview 

The goal of the assignment is to use the Babylon.js system to build something interactive, that uses WebXR.

You should take the sample code, remove the sphere, and build the program described in the rubric.  

You should attach a simple GUI to one of the controllers (your choice).  It should be sized so that it's not in the way, and that you can use the other controller to interact with it. 

When you click the trigger on either controller, you should create a sphere or cube (whichever is selected) of about 0.2 meters in size. There are two cases to consider.  If the ray hits something (the ground or another object), the object should be positioned such that it is touching the collision point.  For the sphere, you should position it such that a point on the sphere hits the collision point. For the cube, the center of one of the faces should touch the collision point.

To keep things simple, you do NOT have to create cubes when the object hit with the ray is a sphere.  Keep your cubes axis aligned, and only create them against the ground or other cubes.

The object created should be the current color in the color selection panel in the GUI.

Finally, when the user presses both "grips" at the same time, all the objects you created should be removed, so they can start over.

You should go to Babylon's [How To...](https://doc.babylonjs.com/how_to/), and click on the "WebXR" filter button.  In the articles, you will see how to do various things with WebXR.  Be sure to look at examples linked into Babylon Playground for ideas on how to do things. 

# Collaboration

You are free to discuss technical questions and issues in the Teams channels, but the code you submit should be your own.  So, please do not post large chunks of code, but providing pointers to examples or documentation pages or classes and methods, along with discussion of how to use them, is fine.

# Submission

You will check out the project from github classroom, and submit it there.  The project folder should contain just the additions to the sample project that are needed to implement the project.  Do not add extra files, and do not remove the .gitignore file (we do not want the "node_modules" directory in your repository.)

**Do Not Change the names** of the existing files (e.g., index.html, index.ts, etc).  The TAs need to be able to test your program as follows:

1. cd into the directory and run ```npm install```
2. start a local web server and compile by running ```npm run start``` and pointing the browser at your ```index.html```

Please test that your submission meets these requirements.  For example, after you check in your final version of the assignment to github, check it out again to a new directory and make sure everything builds and runs correctly.
 
# Development Environment

The sample has already been set up with a complete project for Typescript development.

To work with this sample and prepare your submission, you should have Node (and in particular, npm and npx) installed, which you can retrieve from [nodejs.org](http://nodejs.org).   

In addition to node, you should make sure a recent (e.g., version 3.9 or later) version of Typescript is installed, as described at [www.typescriptlang.org](http://www.typescriptlang.org).

Finally, we will use the node `npx` command to both build the project (with webpack) and run a local http webserver on your machine.  The ```package.json``` is set up to run this server 

## Running 

You set up the initial project by pulling the dependencies from npm with 
```
npm install
```

After that, you can compile and run a server with:
```
npm run start
```

You do not have to run ```tsc``` to build the .js files from the .ts files;  ```npx``` builds them on the fly as part of running webpack.

You can run the sample by pointing your web browser at ```https://localhost:8080/index.html```

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Material for 3D User Interfaces Fall 2020</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.blairmacintyre.me/3dui-class-f20" property="cc:attributionName" rel="cc:attributionURL">Blair MacIntyre</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

The intent of choosing (CC BY-NC-SA 4.0) is to allow individuals and instructors at non-profit entities to use this content.  This includes not-for-profit schools (K-12 and post-secondary). For-profit entities (or people creating courses for those sites) may not use this content without permission (this includes, but is not limited to, for-profit schools and universities and commercial education sites such as Corsera, Udacity, LinkedIn Learning, and other similar sites).   