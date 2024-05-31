import Title from "../common/Title"

const OnlineCourses = () => {
    return (
        <>
            <section className=" py-12">
                <div className="container">
                    <div className=" text-4xl font-bold py-4">
                        <Title subtitle="COURSES" title="Browse Our Online Courses" />
                    </div>
                    

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {online.map((val) => (
                            <div className=" p-4 w-fit h-fit grid grid-cols-2 gap-6 items-center border border-blue-500/75 rounded-lg hover:bg-slate-700 hover:text-white">
                                <div className=" relative w-fit h-fit overflow-hidden p-6">
                                    <img className=" w-full h-full object-cover" src={val.cover} alt="" />
                                </div>
                                <div>
                                    <h1 className=" text-2xl font-semibold">{val.courseName}</h1>
                                    <span className=" text-sm font-semibold text-slate-500">{val.course}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

const online = [
    {
        cover: "./images/courses/online/o1.png",
        hoverCover: "./images/courses/online/o1.1.png",
        courseName: "UI/UX Design Courses",
        course: "25 Courses",
    },
    {
        cover: "./images/courses/online/o2.png",
        hoverCover: "./images/courses/online/o2.1.png",
        courseName: "Art & Design",
        course: "25 Courses",
    },
    {
        cover: "./images/courses/online/o3.png",
        hoverCover: "./images/courses/online/o3.1.png",
        courseName: "Computer Science",
        course: "10 Courses",
    },
    {
        cover: "./images/courses/online/o4.png",
        hoverCover: "./images/courses/online/o4.1.png",
        courseName: "History & Archeologic",
        course: "15 Courses",
    },
    {
        cover: "./images/courses/online/o5.png",
        hoverCover: "./images/courses/online/o5.1.png",
        courseName: "Software Engineering",
        course: "30 Courses",
    },
    {
        cover: "./images/courses/online/o6.png",
        hoverCover: "./images/courses/online/o6.1.png",
        courseName: "Information Software",
        course: "60 Courses",
    },
    {
        cover: "./images/courses/online/o7.png",
        hoverCover: "./images/courses/online/o7.1.png",
        courseName: "Health & Fitness",
        course: "10 Courses",
    },
    {
        cover: "./images/courses/online/o8.png",
        hoverCover: "./images/courses/online/o8.1.png",
        courseName: "Marketing",
        course: "30 Courses",
    },
    {
        cover: "./images/courses/online/o9.png",
        hoverCover: "./images/courses/online/o9.1.png",
        courseName: "Graphic Design",
        course: "80 Courses",
    },
    {
        cover: "./images/courses/online/o10.png",
        hoverCover: "./images/courses/online/o10.1.png",
        courseName: "Music",
        course: "120 Courses",
    },
    {
        cover: "./images/courses/online/o11.png",
        hoverCover: "./images/courses/online/o11.1.png",
        courseName: "Business Administration",
        course: "17 Courses",
    },
    {
        cover: "./images/courses/online/o12.png",
        hoverCover: "./images/courses/online/o12.1.png",
        courseName: "Web Management",
        course: "17 Courses",
    },
]

export default OnlineCourses
