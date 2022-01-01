import React from "react";
import styles from "./index.module.scss";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
    left,
    right,
    onChange,
}) => {
    return (
        <div className={styles.wrap}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>
                {left} / {right}
            </div>
        </div>
    );
};

export default TrackProgress;
