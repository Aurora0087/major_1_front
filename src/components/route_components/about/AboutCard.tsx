import Title from "../common/Title"
import AWrapper from "./AWrapper"


const AboutCard = () => {
    return (
        <>
            <section className=' py-12'>
                <div className=" flex p-2 gap-4 flex-col md:flex-row">
                    <div className=" object-cover overflow-hidden rounded-2xl h-fit w-fit border-2 lg:w-[50vw] border-blue-200">
                        <img className=" hover:scale-105 hover:opacity-80 transition-all" src='./images/about.webp' alt="" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className=" text-2xl font-semibold text-blue-500">
                            <Title subtitle="LEARN ANYTHING" title="Benefits about Online Lerning Expertise" />
                        </div>
                        
                        <div className=" p-4 flex flex-col gap-6">
                            {homeAbout.map((val) => (
                                <div className="border-2 rounded-xl p-4 flex gap-4 items-center bg-slate-200/50 hover:bg-[#1eb2a6] hover:text-white">
                                    <div className="img">
                                        <img src={val.cover} alt="" />
                                    </div>
                                    <div className="text">
                                        <h2 className="text-xl font-semibold">{val.title}</h2>
                                        <p className=" text-xs text-slate-700 hover:text-white">{val.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <AWrapper />
        </>
    )
}

const homeAbout = [
    {
        id: 1,
        cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
        title: "Online Courses",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    },
    {
        id: 1,
        cover: "https://img.icons8.com/ios/80/000000/diploma.png",
        title: "Earn A Certificates",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    },
    {
        id: 1,
        cover: "https://img.icons8.com/ios/80/000000/athlete.png",
        title: "Learn with Expert",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    },
]

export default AboutCard
