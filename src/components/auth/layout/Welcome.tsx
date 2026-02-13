import welcomeImage from "../../../assets/welcome.jpg"

export const Welcome = () => {
    const buttonClicked = () => {
        alert("BAS!!!");
    }
    
    return (
        <div className="min-h-screen items-center justify-end flex flex-col p-5">
            <div className="">
                <img src={welcomeImage} className="rounded-2xl" />
            </div>
            <div className="flex flex-col text-[#2596be] text-center mt-6 gap-4">
                <span className="text-3xl font-[700]">CultureHub</span>
                <span className="">Discover and create</span>
                <span className="">sdjfndsjkfndsfnjksdfnkjdf andjkdsfj dsfjhdsb hjfbs fhjbsdhjf dsbfjhdsbf jhdsbf hjds bfsdj</span>
                <button type="button" onClick={buttonClicked} className="bg-[#5b3a87] text-white rounded-2xl p-3 w-full">Get started</button>
            </div>
        </div>
    )
}