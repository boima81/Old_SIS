import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch } from "react-redux";
import "react-dropzone-uploader/dist/styles.css";
import { deleteApplicationFile } from "app/store/singleApplicationSlice";
import FuseLoading from "@fuse/core/FuseLoading/FuseLoading";

const styles = {
  dropzoneActive: {
    borderColor: "green",
  },
  dropzone: {
    // height: "100px",
    // width: "50%",
    border: "none",
    // overflow: "auto",
  },
};

const FileUpload = ({
  handleFileSubmit,
  data,
  errorMessage,
  values,
  maxFile = 3,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showFiles, setShowFiles] = useState([]);
  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
    return { url, meta: { fileUrl } };
  };

  const handleSubmit = (files, allFiles) => {
    handleFileSubmit(files);
  };

  const handleChangeStatus = (
    { meta, fileWithMeta, file },
    status,
    allFiles
  ) => {
    const finalFile = [
      ...allFiles
        ?.map((fl) => {
          if (fl?.meta?.status === "done") {
            return fl.file;
          }
          return null;
        })
        ?.filter((fl) => fl),
    ];
    data.onChange(finalFile?.length > 0 ? finalFile : "");
    setShowFiles([allFiles]);
    handleSubmit(allFiles);
  };
  const handleDelete = (appFileId) => {
    setLoading(true);

    setLoading(true);
    dispatch(deleteApplicationFile(appFileId))?.then(() => {
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }
  const Preview = ({ meta, fileWithMeta, files }) => {
    const { name, percent, status } = meta;
    return (
      <span
        style={{
          alignSelf: "flex-start",
          margin: "10px 3%",
          fontFamily: "Helvetica",
        }}
      >
        {name}
        <IconButton
          onClick={() => {
            // handleDelete(value?.id);
            fileWithMeta.remove();
          }}
        >
          <DeleteForeverIcon className="cursor-pointer" />
        </IconButton>
      </span>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <Dropzone
          {...data}
          PreviewComponent={Preview}
          // LayoutComponent={Layout}
          // getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          SubmitButtonComponent={null}
          styles={styles}
          maxFiles={maxFile}
          autoUpload={false}
        />
        {errorMessage ? (
          <p
            style={{ fontSize: "1.2rem", color: "#f44336", marginLeft: "14px" }}
          >
            {errorMessage}
          </p>
        ) : (
          ""
        )}

        {/* {data?.value?.map?.((val) => (
          <div>
            {val?.name}
            <IconButton
              onClick={() => {
                // handleDelete(value?.id);
              }}
            >
              <DeleteForeverIcon className="cursor-pointer" />
            </IconButton>
          </div>
        ))} */}
        {values?.map((value) => {
          console.log("value", value);
          return (
            value?.fileId?.url && (
              <>
                <div>
                  <a
                    href={value?.fileId?.url}
                    className="!no-underline !bg-transparent !border-none"
                    target="_blank"
                  >
                    {value?.fileId?.name}
                  </a>
                  <IconButton
                    onClick={() => {
                      handleDelete(value?.id);
                    }}
                  >
                    <DeleteForeverIcon className="cursor-pointer" />
                  </IconButton>
                </div>
              </>
            )
          );
        })}
      </div>
    </>
  );
};
export default FileUpload;
