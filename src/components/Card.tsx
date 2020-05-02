import React, { useState, useEffect } from 'react';

const Card: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <div className="flex items-start px-5">
            <div className="z-10 bg-white shadow rounded-lg p-5 mx-auto xl:w-1/4 lg:w-1/3 md:w-1/2 w-full h-auto mt-5">
                {children}
            </div>
        </div>
    );
};

export default Card;
