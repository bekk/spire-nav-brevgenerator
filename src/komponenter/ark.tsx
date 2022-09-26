import React from 'react';
import parse from 'html-react-parser';

interface ArkProps {
    innhold: string;
}

export const Ark = ({ innhold }: ArkProps) => {
    return (
        <div className="ark">
            <div className="innhold">
                <>{parse(innhold)}</>
            </div>
        </div>
    );
};
