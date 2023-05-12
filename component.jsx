import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
} from 'react-router-dom';
import './styles.css'

const Home = () => {
    //state for the input 
    const [userName, setUserName] = useState("");
    //state for navigation index
    const [index, setIndex] = useState(1);
    const nav = useNavigate();
    //function for navigating between pages
    const navigate = () => {
        switch (index) {
            case 1:
                nav(`/`)
                break;
            case 2:
                nav(`/input`)
                break;
            case 3:
                nav(`/output`, { state: { data: userName } })
                break;
        }
    }
    // go to prev page if it is not the first page
    const handleStepBack = () => {
        if (index !== 1) {
            setIndex(prevIndex => prevIndex - 1);
        }
        // go to next page if it is not the last page
    }
    const handleStepNext = () => {
        if (index !== 3) {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    //navigate if the navigation index is changed
    useEffect(() => {
        navigate();
    }, [index]);
    //render main page
    return (
        <>
            <div className='App'>
                <h1>{`current index is: ${index}`}</h1>
                <div className="contentBox">
                    <Outlet context={{ setUserName }} />
                </div>
                <button onClick={handleStepBack}>предыдущий шаг</button>
                <button onClick={handleStepNext}>следующий шаг</button>
            </div>
        </>
    )
}


//content of the page that doesn't exist
function ErrorPage() {
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    );
}
//content of the first page
const HelloPage = () => {
    return (
        <>
            <h1>Привет Мир!</h1>
        </>
    )
}
//content of the input page; input changes the value of the outlet context
const InputPage = () => {
    const { setUserName } = useOutletContext();

    return (
        <div>
            <input
                placeholder='введите ваше имя'
                type="text"
                required
                onChange={(e) => setUserName(e.target.value)}
            />
        </div>
    )
}
//content of the output page shows the name if one was typed in. Otherwise shows 'empty'
const OutputPage = () => {

    const location = useLocation();
    const data = location.state?.data;
    console.log(data)

    return (
        <>
            <div className='outputWrap'>
                <div className='message'>
                    {data ? data : 'empty'}
                </div>
            </div>
        </>
    )
}
//"root" component of the app
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} >
                    <Route path="/" element={<HelloPage />} />
                    <Route path="/input" element={<InputPage />} />
                    <Route path="/output" element={<OutputPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App