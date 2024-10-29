import React, { createContext, useContext, useState } from 'react';

// Create the context
const SubjectContext = createContext();

// Create a provider component
export const SubjectProvider = ({ children }) => {
  const [subjectName, setSubjectName] = useState("");

  return (
    <SubjectContext.Provider value={{ subjectName, setSubjectName }}>
      {children}
    </SubjectContext.Provider>
  );
};

// Custom hook to use SubjectContext
export const useSubject = () => useContext(SubjectContext);
