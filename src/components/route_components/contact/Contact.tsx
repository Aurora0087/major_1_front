
import React from "react"
import "./contact.css"

const Contact = () => {
    const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127190.16293002277!2d88.30906223870805!3d22.642980222551838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275e760c7e385%3A0xbe36f71585b654a6!2sTwo%20Buildings!5e0!3m2!1sen!2sin!4v1716057014257!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
    return (
        <>
            <section className='contacts padding p-6'>
                <div className='container shadow flexSB'>
                    <div className='left row p-4'>
                        <iframe src={map} ></iframe>
                    </div>
                    <div className='right row'>
                        <h1>Contact us</h1>
                        <p>We're open for any suggestion or just to have a chat</p>

                        <div className='items grid2'>
                            <div className='box'>
                                <h4>ADDRESS:</h4>
                                <p>N/5,Nawabhanga, Sector VI Chingrighata, 700108</p>
                            </div>
                            <div className='box'>
                                <h4>EMAIL:</h4>
                                <p> ksjunction223k2@gmail.com</p>
                            </div>
                            <div className='box'>
                                <h4>PHONE:</h4>
                                <p> +91 7866071844</p>
                            </div>
                        </div>

                        <form action=''>
                            <div className='flexSB'>
                                <input type='text' placeholder='Name' />
                                <input type='email' placeholder='Email' />
                            </div>
                            <input type='text' placeholder='Subject' />
                            <textarea placeholder="Create a message here..." cols={30} rows={10}></textarea>
                            <button className='primary-btn'>SEND MESSAGE</button>
                        </form>

                        <h3>Follow us here</h3>
                        <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact

