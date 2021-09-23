import React, { Component } from 'react';
import '../assets/css/experience.css'

import * as textHelper from "../assets/helpers/texthelpers"

class ExperienceTabs extends Component {

    mediaQuery = window.matchMedia(" (max-width: 600px) ");

    experience = [
        {
            id: "uwaterloo",
            shortName: "UWATERLOO",
            fullName: "University of Waterloo WIL Programs",
            role: "Developer",
            time: "MAY 2021 - AUG 2021",
            points: ["Conducted user testing on human centered design course in collaboration with Deloitte Human Capital consultants", "Designed process to allow for autoscrolling to top of accordion elements when clicked inside CMS iFrame rendering", "Developed template webpages using HTML/CSS to be used in various courses", "Implemented automated testing of webpages through JavaScript, increasing testing efficiency by 75%"],
            desc: "For my first co-op term, I landed a position as a **Developer** for the University of Waterloo's Work Integrated Learning Programs. My role consisted of translating designed content into **webpages** through **HTML/CSS** and the **Bootstrap** framework. I also took on various **JavaScript** projects including running an **automation** **service** for the entire team as well as createing **auto-scrolling** **Bootstrap** **accordions** which were implemented in over 100 pages across 10 educational courses."
        },
        {
            id: "academy",
            shortName: "ACADEMY",
            fullName: "Academy for Mathematics and English",
            role: "Math/Science Tutor",
            time: "MAY 2020 - PRESENT",
            points: ["Provided math, physics and chemistry tutoring to students ranging from grade 3 to 12", "Implemented creative content delivery techniques through games to keep students engaged", "Liased with franchise owners to deliver content effectively"],
            desc: "After gaining acceptance to the University of Waterloo, my job at Tim Hortons was too time consuming. Therefore, as I had prior experience in tutoring and teaching, I applied for and landed a position as **Math** and **Science** tutor at the Academy for Mathematics and English. My job consisted of **adminstering** **content** provided by the franchise to students ranging from grade 2 to grade 12 in mathematics and science. I also provided them with **homework** assignments which were marked by myself as well. **Assessments** were also adminsistered periodically to report to parents on the progress of their children."
        },
        {
            id: "ddsb",
            shortName: "DDSB",
            fullName: "Durham District School Board",
            role: "Math Tutor",
            time: "MAY 2020 - AUG 2020",
            points: ["Assisted summer school Gr. 9 and Gr. 10 math teachers with lesson-planning as well as marking assignments", "Conducted one-on-one tutoring with children that required help with assignments and lesson comprehension.", "Supervised groups of up to 15 students and taught lessons through group activities provided by teacher.", "Used a variety of online tools to conduct tutoring such as Mi- crosoft OneNote, Google Meet, Google Jamboard."],
            desc: "In the spring of 2020, I came across a job posting from the Durham District School Board looking for **summer** **school** **tutors**. As I was free in the summer, I decided to apply for the job and was able to receive an offer. The role consisted of assisting **Grade** **9** and **10** **math** teachers in adminstering content to summer school students as well as providing one-on-one tutoring to students who were struggling with comprehension."
        },
        {
            id: "tims",
            shortName: "TIM HORTONS",
            fullName: "Tim Hortons",
            role: "Team Member",
            time: "AUG 2019 - AUG 2020",
            points: ["Optimized drive-thru efficiency by reducing order times by 5 seconds on average per order", "Coordinated store opening, closing and remodels.", "Managed store-front and drive-thru orders by serving customers in tandem with other team members", "Complete knowledge of POS systems as well as cash-handling procedures"],
            desc: "After moving to Whitby, Ontario, my previous job as a brand ambassador was too far too commute to in the GTA. For this reason, I was looking for a new part-time job. I was able to find a job at a local Tim Hortons in which I was hired as a Team Member. I learned about how to work in an extremely **fast-paced** environment while also mainting the upmost **customer** service. Due to my incredible work ethic, I was also trained as a Baker and took shifts baking as well."
        },
        {
            id: "mosaic",
            shortName: "MOSAIC",
            fullName: "Mosaic North America",
            role: "Brand Ambassador",
            time: "JAN 2017 - AUG 2019",
            points: ["Presented memorable brand experiences for major brands such as Coca Cola", "Implemented sales and marketing techniques to boost product sales by 25%", "Preparing samples in accordance to food safety guidelines", "Maintaining aesthetic displays to attract and close potential sales"],
            desc: "My first job in grade 9 was as a brand ambassador for Mosaic North America. My role required me to travel to various big-box grocery stores in the GTA and setup **brand** **experiences** for large companies such as Coca Cole and Nestle. I was tasked with setting up **aesthetic** **displays** and leveraging samples to create **sales** for the product. I learned a great deal about **marketing** and sales as well as handling food safely."
        }
    ]


    displayTabName = (mediaQuery, index, str=null) =>{
        if (mediaQuery.matches){
            return `[${index}]`;
        }else{
            return str;
        }
    }
    

    render() {
        const { experience } = this;
        return (
            

            
            <div className="col-md-10 experience-tabs d-flex align-items-start">
                <div className="nav flex-column me-3 nav-tabs" id="v-tab" role="tablist" aria-orientation="vertical">
                    {
                        experience.map((item, index)=>{
                            if (index === 0){
                                return (
                                    <button key={index} className="nav-link active" id={`tabs-${item.id}`} data-bs-toggle="tab" data-bs-target={`#tab-${item.id}`} type="button" role="tab" aria-controls={`tab-${item.id}`} aria-selected="true">{this.displayTabName(this.mediaQuery, index, item.shortName)}</button>
                                )
                            }else{
                                return (
                                    <button key={index} className="nav-link" id={`tabs-${item.id}`} data-bs-toggle="tab" data-bs-target={`#tab-${item.id}`} type="button" role="tab" aria-controls={`tab-${item.id}`} aria-selected="false">{this.displayTabName(this.mediaQuery, index, item.shortName)}</button>
                                )
                            }
                        })
                    }
                </div>
                <div className="tab-content" id="v-tabContent">
                    {
                        experience.map((item, index)=>{
                            if (index === 0){
                                return (
                                    <div key={index} className="tab-pane fade show active" id={`tab-${item.id}`} role="tabpanel" aria-labelledby={`tabs-${item.id}`}>
                                        <h3 className="text-light fw-bold ">{item.role} @ <span>{item.fullName}</span></h3>
                                        <h5 className="text-slate ">{item.time}</h5>
                                        <p className="text-slate fs-5">{item.desc.split(" ").map( word => {
                                            return textHelper.boldText(word)
                                        })}</p>
                                        {/* <ul className="tech-list text-slate exp-list">

                                            {
                                                item.points.map((point, index)=>{
                                                    return (<li key={index}><div className="fs-4"><i class='bx bx-code-alt'></i></div> {point}</li>)
                                                })
                                            }
                                            
                                        </ul> */}
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={index} className="tab-pane fade" id={`tab-${item.id}`} role="tabpanel" aria-labelledby={`tabs-${item.id}`}>
                                        <h3 className="text-light fw-bold">{item.role} @ <span>{item.fullName}</span></h3>
                                        <h5 className="text-slate">{item.time}</h5>
                                        <p className="text-slate fs-5">{
                                            item.desc.split(" ").map( word => {
                                                return textHelper.boldText(word)
                                            })
                                        }</p>
                                        {/* <ul className="tech-list text-slate exp-list">

                                            {
                                                item.points.map((point, index)=>{
                                                    return (<li key={index} ><div className="fs-4"><i class='bx bx-code-alt'></i></div> {point}</li>)
                                                })
                                            }
                                            
                                        </ul> */}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            
        );
    }
}

export default ExperienceTabs;
