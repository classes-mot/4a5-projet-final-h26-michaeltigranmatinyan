import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Intro from "./Intro";

describe("Composant Intro", () => {
  it("rend correctement le titre et le sous-titre", () => {
    render(<Intro />);

    const title = screen.getByText("Trouvez tous vos besoins électroniques!");
    const subtitle = screen.getByText("Commerce électronique d'échange et d'achat d'appareils électroniques");
    const button = screen.getByText("Voir l'inventaire!");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
