import React, {  
  ComponentType,
  FC
} from "react";

export function injectService<T>(service: T) {
  return <P extends object>(Injectable: ComponentType<P>): FC<P & T> => ({
    ...props }: T & P
  ) => <Injectable {...(props as P)} {...service} />;
}
