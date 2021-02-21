import React from 'react';

const AppState = {
    theme: 'light',
};

const AppContext = React.createContext(AppState);
const AppDispatchContext = React.createContext(undefined);

const AppReducer = (state, action) => {
    const { type, payload } = action;
    const html = document.documentElement;

    switch (type) {
        case 'darkTheme':
            html.classList.replace('light', 'dark');
            return { theme: payload };
        
        case 'lightTheme':
            html.classList.replace('dark', 'light');
            return { theme: payload };
     
        default:
            return state;
    };
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(AppReducer, AppState);

    return (
        <AppContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    )
};

const useAppState = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within a AppProvider');
    }

    return context;
};

const useAppDispatch = () => {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within a AppProvider');
    }

    return context;
};

export { AppProvider, useAppState, useAppDispatch };