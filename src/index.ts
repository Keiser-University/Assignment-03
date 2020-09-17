import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
//import { Ray } from "@babylonjs/core/Culling/ray";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import "@babylonjs/core/Materials/standardMaterial";

import "@babylonjs/core/Helpers/sceneHelpers";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { WebXRFeatureName, WebXRFeaturesManager } from "@babylonjs/core/XR/webXRFeaturesManager";
import { WebXRMotionControllerManager } from "@babylonjs/core/XR/motionController/webXRMotionControllerManager";

// add this to import the controller models from the online repository
import "@babylonjs/loaders"

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import {MeshBuilder} from  "@babylonjs/core/Meshes/meshBuilder";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element 
const engine = new Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the Playground Class with a static CreateScene function ******/

// note: we've changed the structure since A0, to handle the asych methods used for setting up 
// XR. In particular, "createDefaultXRExperienceAsync" needs to load models and create various 
// things.  So, the function returns a promise, allowing you to do other things while it runs.  
// Since we don't want to continue executing till it finishes, we use "await" to wait for the 
// promise to finish.  But await can only run inside async functions.
// see https://javascript.info/async-await

const createScene = async function(engine: Engine, canvas: HTMLCanvasElement) {
    // Create the scene space
    const scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Add lights to the scene
    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    new PointLight("light2", new Vector3(0, 1, -1), scene);

    // Add and manipulate meshes in the scene
    var sphere = MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // // prioritize the local classes (but use online if controller not found)
    // WebXRMotionControllerManager.PrioritizeOnlineRepository = true;
    // // or disable the online repository
    // WebXRMotionControllerManager.UseOnlineRepository = true;

    const environment = scene.createDefaultEnvironment();

    // XR stuff
    const xrHelper = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [environment!.ground!]
    });
    const availableFeatures = WebXRFeaturesManager.GetAvailableFeatures();
    console.log(availableFeatures)
    
    // capture selection events (pulling the trigger, clicking the mouse button)
    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case PointerEventTypes.POINTERDOWN:
                var pickResult = pointerInfo.pickInfo;
                if (pickResult && pickResult.hit) {
                    // here's the intersection point, in local coordinates of the object
                    console.log(pickResult.pickedPoint);
                }
        }
    });

    // capture the other WebXR controller inputs.  Can watch for all the other buttons and inputs. 
    // These ControllerAdded and ControllerInit are called whenever a controller appears, both at
    // the start, and if you let the controller go to sleep, when it wakes
    xrHelper.input.onControllerAddedObservable.add((controller) => {
        // should set the corresponding onControllerRemovedObservable to tear down things when
        // a controller goes to sleep or otherwise goes away

        // controller.grip and controller.pointer are two versions of the location of
        // the controller. Grip is probably where the squeeze button is.
        // They are in the scene graph and you can add children to them to have something follow the controller

        controller.onMotionControllerInitObservable.add((motionController) => {
            // Now that we have a controller, we can check it's features.
            // For example, is squeeze available on this controller?
            const squeeze = motionController.getComponentOfType('squeeze');
            if (squeeze) {
                // check its state and handle state changes.  The callback is called 
                // when the squeeze state changes.
                squeeze.onButtonStateChangedObservable.add(() => {

                    // pressed was changed
                    if (squeeze.changes.pressed) {
                        // is it pressed?
                        if (squeeze.pressed) {
                            const position = controller.grip ? controller.grip.position : controller.pointer.position;

                        }
                    }
                })
            }
        });
    });

    return scene;
}


/******* End of the create scene function ******/    

createScene(engine, engine.getRenderingCanvas() as HTMLCanvasElement).then(
    function (scene: Scene) {
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () { 
            scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () { 
            engine.resize();
        });

    }
)
