# react-pinify

### Simplifying secure PIN input for React applications effortlessly

## Usage

```
npm i react-pinify
```

```jsx
import {usePinify, Pinify} from 'react-pinify'

const App = () => {

    const pinify = usePinify();

    const formSubmitHandler = () => {
        try {
            const val = pinify.submitEventHandler()
            console.log(val)
        }
        catch (e) {
            console.error(e)
        }
    }

    return <>
        <Pinify 
            reference={pinify.ref} 
            onChange={pinify.valueChangeHandler} 
        />
        <button onClick={}>Submit</button>
        {/*JSX*/}
    </>
}
```