import React, { createContext, ReactNode, useContext, useMemo } from "react";

// Definindo o tipo do contexto
type DateContextType = {
  dataAtual: string;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

type DateProviderProps = {
  children: ReactNode;
};

export const DateProvider = ({ children }: DateProviderProps) => {
  const getDataAtualFormatada = (): string => {
    const agora = new Date();

    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const diaSemana = diasSemana[agora.getDay()];
    const dia = agora.getDate();
    const mes = meses[agora.getMonth()];

    return `${diaSemana}, ${dia} de ${mes}`;
  };

  // useMemo to avoid recalculating the date every time the component rerenders
  const dataAtual = useMemo(() => getDataAtualFormatada(), []);

  return (
    <DateContext.Provider value={{ dataAtual }}>
      {children}
    </DateContext.Provider>
  );
};

// Hook to consume the context
export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
