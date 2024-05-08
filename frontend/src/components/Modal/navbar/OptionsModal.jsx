// services
import { logoutService } from "../../../services/user";

// context
import { UserContext } from "../../../context/User";

// hooks
import useFormSubmit from "../../../hooks/user/useFormSubmit";

// react
import { useContext } from "react";

function OptionsModal({ toggleAccountModal }) {
  const { onSubmit } = useFormSubmit(logoutService);

  const { token } = useContext(UserContext);

  const handleFormSubmit = () => {
    onSubmit("logout", null, { refresh: token.refresh });
  };

  const OptionsModalMobile = () => {
    return (
      <div
        className="absolute flex flex-col w-48 p-2 border border-primary rounded-xl right-2 top-full bg-white z-10"
        onClick={toggleAccountModal}
      >
        <button className="text-start rounded-xl py-2 px-3">
          Configuración
        </button>
        <button className="text-start rounded-xl py-2 px-3">
          Cambiar tema
        </button>
        <button className="text-start rounded-xl py-2 px-3">Ver perfil</button>
        <button
          className="text-start rounded-xl py-2 px-3"
          onClick={handleFormSubmit}
        >
          Salir
        </button>
      </div>
    );
  };

  const OptionsModalDesktop = () => {
    return (
      <div className="absolute flex flex-col w-48 p-2 border border-primary rounded-xl left-0 bottom-full bg-white z-10">
        <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
          Configuración
        </button>
        <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
          Cambiar tema
        </button>
        <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
          Ver perfil
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100"
          onClick={handleFormSubmit}
        >
          Salir
        </button>
      </div>
    );
  };

  return { OptionsModalMobile, OptionsModalDesktop };
}

export default OptionsModal;
