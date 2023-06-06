import React, { FC, useState } from "react"
import { Manifest, Project, ProjectVariation } from "@/utils/models";
import clsx from "clsx"

export type ProjectSelectorProps = {
    manifest: Manifest,
    setSelectedItems: any,
    classname?: string
}
export const ProjectSelector: FC<ProjectSelectorProps> = ({manifest, setSelectedItems, classname}) => {
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [selectedProjectVariation, setSelectedProjectVariation] = useState<ProjectVariation>();

    function setProjectVariation(variation) {
        setSelectedProjectVariation(variation);
        setSelectedItems(variation.items);
    }

    return (
        <div className={classname}>
            <p>Select Project</p>
            <p className="isolate inline-flex rounded-md shadow-sm mb-4">
                {manifest.projects.map((project, index) => {
                    return (
                        <button key={project.name}
                                type="button"
                                className={clsx(selectedProject?.name === project.name ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                                    "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                                onClick={() => setSelectedProject(project)}
                        >
                            {project.name}
                        </button>
                    )
                })
                }
            </p>
            <br/>
            {selectedProject &&
              <div>
                <p>Select Project Variation</p>
                <p className="isolate inline-flex rounded-md shadow-sm">
                    {selectedProject.variations.map((variation, index) => {
                        return (
                            <button key={variation.name}
                                    type="button"
                                    className={clsx(  selectedProjectVariation?.name === variation.name ? "bg-blue-400 hover:bg-blue-500" : "bg-white hover:bg-gray-50",
                                        "relative inline-flex items-center first:rounded-l-md last:rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10")}
                                    onClick={() => setProjectVariation(variation)}
                            >
                                {variation.name}
                            </button>
                        )
                    })
                    }
                </p>
              </div>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}