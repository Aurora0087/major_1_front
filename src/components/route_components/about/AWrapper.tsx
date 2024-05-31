

const AWrapper = () => {
    return (
        <>
            <section className=' p-6 py-12 bg-gray-200 rounded-md'>
                <div className=" grid grid-cols-2 gap-4 place-content-center">
                    {awrapper.map((val) => (
                        <div className="flex gap-4 bg-blue-500 rounded-lg p-2 items-center text-white hover:bg-blue-400">
                            <div className="img">
                                <img src={val.cover} alt="" />
                            </div>
                            <div className="text">
                                <h1 className=" text-2xl font-bold">{val.data}</h1>
                                <h3>{val.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

const awrapper = [
    {
      cover: "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/ffffff/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
      data: "3,000",
      title: "SUCCESS STORIES",
    },
  
    {
      cover: "https://img.icons8.com/ios/80/ffffff/athlete.png",
      data: "320",
      title: "TRUSTED TUTORS",
    },
    {
      cover: "https://img.icons8.com/external-outline-icons-maxicons/80/ffffff/external-calender-insurance-outline-outline-icons-maxicons.png",
      data: "1,000",
      title: "SCHEDULES",
    },
    {
      cover: "https://img.icons8.com/ios/80/ffffff/macbook-idea--v3.png",
      data: "587",
      title: "COURSES",
    },
  ]

export default AWrapper
