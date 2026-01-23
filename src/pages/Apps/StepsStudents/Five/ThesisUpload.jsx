
import { showObservations } from '../utils/ShowObservations';

const ThesisUpload = ({ thesisId, observations }) => {

    return (
        <div className="flex gap-3 justify-center">
            <button className="btn btn-sm btn-outline-success m-0" onClick={() => showObservations(observations)}>Observaciones</button>
        </div>
    );
};

export default ThesisUpload;
