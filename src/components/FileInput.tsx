import React, {FunctionComponent, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
      },
      margin: {
        margin: theme.spacing(1),
      },
      fileInput: {
        display: 'none',
      },
      button: {},
    }),
);

type FileInputProps = {
  id: string;
  name: string;
  error?: boolean;
  required?: boolean;
  onFileChange?: (file?: File) => void;
};

const FileInput: FunctionComponent<FileInputProps> = ({id, name, error, required, onFileChange}) => {
  const classes = useStyles();

  const inputEl = React.useRef(null);
  const [filename, setFilename] = useState('');

  const onClick = () => {
    // @ts-ignore
    inputEl.current.click();
  }

  const handleChange = (files: FileList | null) => {
    setFilename(files ? files[0].name : '');
    if (onFileChange) {
      onFileChange(files && files.length > 0 ? files[0] : undefined);
    }
  }

  return (
      <FormControl error={error} required={required} fullWidth>
        <InputLabel htmlFor={id + "-visible"} shrink={true}>{name}</InputLabel>
        <Input
            id={id + "-visible"}
            type="text"
            readOnly
            required={required}
            placeholder="No file selected"
            value={filename}
            endAdornment={
              <InputAdornment position="end">
                <input
                    ref={inputEl}
                    className={classes.fileInput}
                    accept="application/json"
                    id={id}
                    name={id}
                    type="file"
                    required={required}
                    onChange={(e) => handleChange(e.target.files)}
                />
                <label htmlFor={id}>
                  <Button color="primary" onClick={() => onClick()}>
                    Browse
                  </Button>
                </label>
              </InputAdornment>
            }
        />
      </FormControl>
  );
};

export default FileInput;