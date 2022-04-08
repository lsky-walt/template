const prefix =
  (classNamePrefix) =>
  (...args) =>
    args
      .map((cn) => {
        if (cn === "-" || cn === "_") {
          return classNamePrefix || ""
        }
        return classNamePrefix ? `${classNamePrefix}-${cn}` : cn
      })
      .join(" ")

// 添加 className 前缀
export const className = prefix("test-abc")
