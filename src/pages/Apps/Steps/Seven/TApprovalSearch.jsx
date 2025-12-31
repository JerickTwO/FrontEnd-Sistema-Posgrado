import IconSearch from '../../../../components/Icon/IconSearch';

const TApprovalSearch = ({ search, setSearch }) => {
    return (
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-5">Aprobación de Informe</h2>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar por DNI, codigo y nombre"
                            className="form-input py-2 ltr:pr-8 rtl:pl-8 peer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary" aria-label="Buscar">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TApprovalSearch;
