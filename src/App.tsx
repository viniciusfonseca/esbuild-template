import { Button } from '@rmwc/button'
import { h } from 'preact'

import '@rmwc/button/styles'
import './styles.css'
import { useState } from 'preact/hooks'

export const App = () => {

    const [clicked, setClicked] = useState(0)

    return (
        <div>
            <code> Hello ESBuild + Preact + RMWC </code>
            <Button label={`Clicked ${clicked} times`} raised onClick={() => setClicked(n => n + 1)} />
        </div>
    )
}