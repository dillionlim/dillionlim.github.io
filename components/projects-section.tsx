"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"; // Importing your custom carousel components

const projects = [
  {
    title: "Personal Website",
    description: "The website you are currently viewing!",
    tech: ["Next.js", "Tailwind CSS", "R", "RMarkdown"],
    image: "/images/personal-website.png",
    moreInfo: "This is my personal website, showcasing various projects and skills. \n It is built with Next.js and Tailwind CSS.\n Additionally, due to the fact that I would like to include things like Tikz in my blog, I decided to use RMarkdown, which supports it. RMarkdown support static site generation to raw HTML, and I then built a wrapper around the static site generator and integrated it with Github workflows to make a fully functional blog feature.",
  },
  {
    title: "Singapore Chemistry League",
    description: "This is a contest management system for Singapore Chemistry League, a national level competition for students in junior college.",
    linkable: true,
    link: "https://www.sgchemleague.org/",
    tech: ["React", "MongoDB", "AWS"],
    image: "/images/schl.png",
    moreInfo: "The Singapore Chemistry League website is used to host the annual competition, where more than 200 teams come together to solve open-internet chemistry problems.\n The website was built with Next.js with MongoDB as a database.\n In particular, pre-warming on AWS elastic load balancing solves the problem arising from scaling instances appropriately with bursty traffic (such as at the start of the competition).",
    carouselImages: [
      "/images/schl-problems.jpg",
    ]
  },
  {
    title: "Fuel Tracking App",
    description: "A fuel tracking app to tally the fuel receipts submitted with the Shell web portal for Exercise Wallaby 2024.",
    tech: ["React", "Material UI", "Cloudflare D1 Database", "Cloudflare Functions (Node.js)"],
    image: "/images/fuel-tracker.png",
    moreInfo: "This fuel tracking app was rapidly developed in Exercise Wallaby 2024 to more accurately identify missing fuel receipt submissions, as well as tally the information provided by users.\n This greatly improved the accuracy of tracking fuel consumption and streamlined processes to account for missing fuel receipts.\n The app was used for RSAF-wide transport fuel tracking.",
    carouselImages: [
      "/images/fuel-tracker-add-submission.png",
      "/images/fuel-tracker-final-verification.png",
    ]
  },
  {
    title: "Mileage Editor App",
    description: "A companion app to aggregate information about mileage, and edit erroneous mileage data for Exercise Wallaby 2024.",
    tech: ["React", "Material UI", "Cloudflare D1 Database", "Cloudflare Functions (Node.js)", "Cloud Firestore"],
    image: "/images/mileage-editor.png",
    moreInfo: "This app was developed as a companion app to the mileage tracker used in Exercise Wallaby 2024.\n Noticing that commanders were unable to edit erroneously entered mileage data, as well as being unable to aggregate all data to perform statistics, this app was created to fulfil those roles. It also uses flags out potentially erroneous mileages for review.",
    carouselImages: [
      "/images/mileage-editor-modal.png",
    ]
  },
  {
    title: "Optimizing Coverage of a Robotic Fleet",
    description: "My internship project at DSTA, which involved writing a ROS2 package to optimize the coverage of a set of robots.",
    tech: ["ROS2", "Python", "Gurobi API"],
    image: "/images/maximum-coverage.png",
    moreInfo: "I made use of linear programming, together with some approximations to develop an approximation algorithm with over 95% accuracy to distribute a robotic fleet optimally.\n I then integrated this with a navigation stack and visual Simultaneous Localization and Mapping (SLAM), making use of only RGBD cameras.",
    carouselImages: [
      "/images/integrated-dynamic-obstacle-avoidance.png",
      "/images/maximum-coverage-algo.png",
    ]
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageToEnlarge, setImageToEnlarge] = useState<string | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedProject(index);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImageClick = (image: string) => {
    setImageToEnlarge(image);
  };
  const closeImageEnlarge = () => {
    setImageToEnlarge(null);
  };

  return (
    <section id="projects" className="py-10 bg-background/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className="aspect-video overflow-hidden rounded-md">
                <div className="relative min-h-[300px] min-w-[64px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="object-contain"
                    fill
                  />
                </div>
              </div>
              <CardHeader>
                {project.linkable ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    <CardTitle>{project.title}</CardTitle>
                  </a>
                ) : (
                  <CardTitle>{project.title}</CardTitle>
                )}
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProject !== null && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogOverlay className="fixed inset-0 bg-black/0" />
          <DialogContent className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-xl z-50">
            <DialogTitle className="text-2xl font-bold">{projects[selectedProject].title}</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-gray-700 whitespace-normal">
            {projects[selectedProject].moreInfo.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br/>
                <br/>
              </span>
            ))}
            </DialogDescription>

            {projects[selectedProject].carouselImages &&
              <div className="mt-4 relative">
                <Carousel>
                  <CarouselContent>
                    {projects[selectedProject]?.carouselImages?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="flex justify-center">
                          <div className="relative">
                            <Image
                              src={image}
                              alt={`Project image ${index + 1}`}
                              width={300}
                              height={200}
                              className="object-cover rounded-lg cursor-pointer"
                              onClick={() => handleImageClick(image)}
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10">
                    <CarouselPrevious />
                  </div>
                  <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10">
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            }
          </DialogContent>
        </Dialog>
      )}

      {imageToEnlarge && (
        <Dialog open={true} onOpenChange={closeImageEnlarge}>
          <DialogOverlay className="fixed inset-0 bg-black/0" />
          <DialogContent className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow-xl z-50 space-y-4">
            <button
              className="absolute top-2 right-2 text-white font-bold text-2xl"
              onClick={closeImageEnlarge}
            >
              ×
            </button>
            <div className="relative">
              <Image
                src={imageToEnlarge}
                alt="Enlarged Project Image"
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
