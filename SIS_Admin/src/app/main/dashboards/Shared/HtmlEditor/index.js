import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./HtmlEditor.css";

function HtmlEditor({
  value,
  onChange,
  className,
  placeholder,
  errorMessage,
  readOnly = false,
  data,
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <p>{placeholder}</p>
        <ReactQuill
          {...data}
          theme="snow"
          className={className}
          placeholder={placeholder}
          readOnly={readOnly}
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
      </div>
    </>
  );
}

export default HtmlEditor;
