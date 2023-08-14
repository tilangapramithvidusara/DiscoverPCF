// /* eslint-disable no-mixed-spaces-and-tabs */
// import {IInputs, IOutputs} from "./generated/ManifestTypes";
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import axios from 'axios'
// import toJsonSchema = require("to-json-schema");

// export class ROMPCF implements ComponentFramework.StandardControl<IInputs, any> {

//     /**
//      * Empty constructor.
//      */
//     private outputSchema: any;
//     private response: any;
//     constructor()
//     {

//     }

//     /**
//      * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
//      * Data-set values are not initialized here, use updateView.
//      * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
//      * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
//      * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
//      * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
//      */
//     public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
//     {
//         // Add control initialization code
//     }


//     /**
//      * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
//      * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
//      */
//     public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {    
//         this.jsonLoader(context);
//         return React.createElement(React.Fragment);
//     }

//     async jsonLoader(context: ComponentFramework.Context<IInputs>) {
//         var raw = JSON.stringify({
//             "organizationUri":"https://dev.azure.com/SEERTEST2",
//             "personalAccessToken":"463gkmxizfacu7p3a2hxwtnzlupgxc5ubw5kzl6lxlqkgfsbyv3a",
//             "projectName":"SEETTEST1",
//             "workItemType":"Task"
//         });

//         var requestOptions: any = {
//             method:'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body:raw,
//             redirect:'follow'
//         };

//         fetch("https://prod-23.uksouth.logic.azure.com:443/workflows/763b7511d88e4f1792f536a74e427460/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6q-xdGjivta0Ok1hkCC98dtY0Pl3B0LceSKciO5zNYM", requestOptions)
//         .then(response=>response.text())
//         .then((result: any)=> {

//             console.log(result)
//             if (result && result?.Value && result?.Value > 0) {
//                 this.response = result.Value;
//                 if(this.outputSchema == null){
//                     this.outputSchema = toJsonSchema(result?.Value);
//                 }
//                 this.notifyOutputChanged();
//                 // this.getOutputSchema(context);
//                 // this.getOutputs();
//             }

//         })
//         .catch(error=>console.log('error',error));
//     }
//     /**
//      * It is called by the framework prior to a control receiving new data.
//      * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
//      */
//     public getOutputs(): any
//     {
//         return { 
//             output: this.response, 
//             outputSchema : JSON.stringify(this.outputSchema)
//          };
//     }
//     public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<any> {
//         return Promise.resolve({
//             output: this.outputSchema
//         });
//     }

//     /**
//      * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
//      * i.e. cancelling any pending remote calls, removing listeners, etc.
//      */
//     public destroy(): void
//     {
//         // Add code to cleanup control if necessary
//     }
// }




import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import axios from 'axios';
// import toJsonSchema from "to-json-schema";
import toJsonSchema = require("to-json-schema");

export class ROMPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private outputSchema: any = null;
    private response: any = null;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Initialize the control here
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.jsonLoader(context);
        return React.createElement(React.Fragment); 
        // Use React.Fragment shorthand
    }

    private async jsonLoader(context: ComponentFramework.Context<IInputs>): Promise<void> {
        try {
            const response = await axios.post("https://prod-23.uksouth.logic.azure.com:443/workflows/...", {
                organizationUri: "https://dev.azure.com/SEERTEST2",
                personalAccessToken: "463gkmxizfacu7p3a2hxwtnzlupgxc5ubw5kzl6lxlqkgfsbyv3a",
                projectName: "SEETTEST1",
                workItemType: "Task"
            });

            console.log(response.data);

            if (response.data && response.data?.Value && response.data?.Value > 0) {
                this.response = response.data.Value;

                if (!this.outputSchema) {
                    this.outputSchema = toJsonSchema(response.data.Value);
                }

                this.notifyOutputChanged();
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    public getOutputs(): IOutputs {
        return {
            output: this.response,
            outputSchema: JSON.stringify(this.outputSchema)
        };
    }

    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<any> {
        return {
            output: this.outputSchema
        };
    }

    public destroy(): void {
        // Cleanup code here
    }

    private notifyOutputChanged(): void {
        // Implement this method to notify the framework about output changes
    }
}
