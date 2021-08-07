import reactDOM from 'react-dom'
import React from 'react'
import Quiz from './Quiz'


function App() {
    return (
        <div>
            <Quiz>

            </Quiz>

        </div>
    )
}
export default App 

const rootElement = document.getElementById('root')
reactDOM.render(<App></App>, rootElement)