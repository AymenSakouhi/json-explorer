import { useState } from "react";
import styles from "./JSONViewer.module.css";
import Container from "./shared/Container";
import { FieldsData, JsonData } from "../models/json-data.model";

interface Props {
  res: JsonData;
}

const JsonViewer: React.FC<Props> = ({ res }) => {
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleKeyClick = (
    key: string,
    parentPath = "",
    event: React.MouseEvent<HTMLSpanElement>,
    value: string | boolean | number
  ) => {
    const fullPath = parentPath ? `${parentPath}.${key}` : `.${key}`;
    setSelectedKey(`res${fullPath}`);
    setSelectedValue(value.toString());
    event.stopPropagation();
  };

  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const getJsonValue = (res: any, path: string) => {
    if (path.lastIndexOf(".") === path.length - 1)
      return "continue typing or select a property";
    const keys = path.split(".");
    let value = res;
    for (const key of keys) {
      if (key.indexOf("[") && key.indexOf("]") === key.length - 1) {
        const indexPart = key.split("[")[1].split("]")[0];
        const KeyPart = key.split("[")[0];
        value[KeyPart] &&
          value[KeyPart].map((ele: FieldsData, idx: number) => {
            if (idx === parseInt(indexPart)) {
              value = ele;
            }
          });
      } else {
        value = value[key];
      }
    }
    if (typeof value === "object") return "please select a property";
    if (Array.isArray(value)) {
      const arr = Array.isArray(value);
      value = arr;
      return value;
    }
    if (typeof value === "boolean") {
      return value.toString();
    }
    return value;
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyPath = event.target.value;
    setSelectedKey(keyPath);
    const value = getJsonValue({ res }, keyPath);
    setSelectedValue(value);
  };

  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const renderJsonValue = (value: any, path = "") => {
    if (Array.isArray(value)) {
      return (
        <span>
          <Container enClose={"[]"}>
            {value.map((item, index) => (
              <span className={styles.list} key={index}>
                {renderJsonValue(item, `${path}[${index}]`)}
                {","}
              </span>
            ))}
          </Container>
        </span>
      );
    } else if (typeof value === "object")
      return (
        <Container enClose={"{}"}>
          <span>
            {Object.keys(value).map((key) => (
              <span
                key={key}
                className={`${styles.list}`}
                onClick={(event) =>
                  typeof value[key] !== "object"
                    ? handleKeyClick(key, path, event, value[key])
                    : null
                }
              >
                <span
                  className={`
                    ${typeof value[key] !== "object" ? `${styles.key}` : ""} `}
                >
                  {key}
                </span>
                : {renderJsonValue(value[key], `${path}.${key}`)},
              </span>
            ))}
          </span>
        </Container>
      );
    else if (typeof value === "boolean")
      return <span className={styles.boolean}> {value.toString()}</span>;
    else if (typeof value === "number")
      return <span className={styles.number}> {value}</span>;
    else return <span>'{value}'</span>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div>
          <label htmlFor="property"></label>
          <input
            id="property"
            className={styles.inputText}
            type="text"
            value={selectedKey}
            onChange={handleChange}
          />
        </div>

        <img src="https://img.icons8.com/ios-filled/50/null/long-arrow-right.png" />

        <div>
          <p className={styles.valuePlaceholder}>
            {selectedValue ? selectedValue : "undefined"}
          </p>
        </div>
      </div>

      <div className={styles.jsonContainer}>{renderJsonValue(res)}</div>
    </div>
  );
};

export default JsonViewer;
