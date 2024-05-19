// services
import { updateUserService } from "../../../services/user";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";
import useFileReader from "../../../hooks/post/useFileReader";
import useFormSubmit from "../../../hooks/user/useFormSubmit";

// react
import { useContext, useState } from "react";

function ModalProfile() {
  const { theme, showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user, token } = useContext(UserContext);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalProfile,
    showModalProfile
  );

  const { onSubmit } = useFormSubmit(updateUserService);

  // Estado para almacenar la imagen de previsualización de la foto de perfil
  const [cover, setCover] = useState(null);
  // Estado para almacenar la foto de perfil del usuario
  const [profilePicture, setProfilePicture] = useState(null);
  // Estado para almacenar la biografía del usuario
  const [bio, setBio] = useState(user.biography);
  // Estado para almacenar el sitio web del usuario
  const [sitio, setSitio] = useState(user.website);

  const { handleChangeFile } = useFileReader(setCover);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "biography") {
      setBio(value);
    } else if (name == "website") {
      setSitio(value);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    const fields = {
      profile_picture: profilePicture,
      biography: bio,
      website: sitio,
    };

    for (const [fieldName, fieldValue] of Object.entries(fields)) {
      if (fieldValue) {
        data.append(fieldName, fieldValue);
      }
    }

    try {
      onSubmit("update", token.access, data, user.id);
      toggleShowModal();
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col w-full h-full xs:max-w-xl xs:h-5/6 xs:rounded-lg bg-white dark:bg-DarkColor`}
      >
        <div className="flex items-center p-2 border-b-2 border-colorHover dark:border-darkColorHover">
          <button
            onClick={() => {
              toggleShowModal();
            }}
          >
            {theme === "light" ? (
              <UseSvgLoader
                name="arrow-left"
                options={{ width: "32px", height: "32px" }}
              />
            ) : (
              <UseSvgLoader
                name="arrow-leftDark"
                options={{ width: "32px", height: "32px" }}
              />
            )}
          </button>
          <p className="grow text-base font-semibold text-black dark:text-white">
            Editar perfil
          </p>
          <button
            className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
        <form className="grow flex flex-col" onSubmit={handleSubmit}>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="py-2">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Actualizar foto de perfil
              </label>
            </div>
            <div
              className={`${
                !!cover ? "relative grow " : ""
              }flex justify-center items-center`}
            >
              {!cover ? (
                <input
                  type="file"
                  accept=".png, .jpg, .webp"
                  className="text-sm file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold text-darkColorHover dark:text-colorHover file:text-white file:bg-PrimaryColor hover:file:bg-PrimaryColorHover"
                  onChange={(e) => {
                    handleChangeFile(e);
                    handleFile(e);
                  }}
                />
              ) : (
                <img
                  src={cover}
                  alt=""
                  className="absolute w-44 h-44 rounded-full object-cover"
                />
              )}
            </div>
            {cover && (
              <div className="p-2">
                <label
                  className="text-xs  text-PrimaryColor hover:text-PrimaryColorHover cursor-pointer"
                  onClick={() => {
                    setCover(null);
                  }}
                >
                  Seleccionar otra foto
                </label>
              </div>
            )}
          </div>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Biografía
              </label>
              <textarea
                name="biography"
                className="grow w-4/5 border rounded text-base text-center resize-none focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
                value={!!bio ? bio : ""}
                onChange={handleChange}
              />
              <p className="text-xs text-secondaryText dark:text-secondaryTextDark pb-2">
                Cuéntanos un poco sobre ti en unas pocas palabras.
              </p>
            </div>
            <div className="basis-1/2 flex flex-col justify-center items-center">
              <label className="text-base sm:text-lg font-semibold text-black dark:text-white">
                Sitio Web
              </label>
              <input
                type="text"
                name="website"
                className="w-4/5 py-2 px-3 border rounded text-sm xs:text-base text-center focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
                value={!!sitio ? sitio : ""}
                onChange={handleChange}
              />
              <p className="text-xs text-secondaryText dark:text-secondaryTextDark pb-2">
                Agrega enlaces a tus perfiles en redes sociales y sitios web
                aquí.
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden xs:block absolute top-0 right-0 p-4">
        <button
          onClick={() => {
            toggleShowModal();
          }}
        >
          {theme === "light" ? (
            <UseSvgLoader
              name="x"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="xDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default ModalProfile;
