import  { useEffect, useState } from "react";
import "../Styling/SlideMessage.css";

const SlideMessage = ({ message = "This is a slide message", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
       <>
        <div className={`slide-message ${visible ? "slide-in" : "slide-out"}`}>
            <div className="message-content">
                {message}
            </div>
            <div className="progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
        </div>
       </>
    );
};

export default SlideMessage;
