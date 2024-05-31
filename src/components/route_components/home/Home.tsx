import AboutCard from "../about/AboutCard"
import HAbout from "./HAbout"
import Hero from "./Hero"


const Home = () => {
    return (
        <div className=" p-6">
            <Hero />
            <AboutCard />
            <HAbout />
        </div>
    )
}

export default Home
