import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import UserPostsList from "./UserPostsList";

describe("Composant UserPostsList", () => {
  it("affiche le message par défaut si aucun item n'est fourni", () => {
    const mockOnDelete = vi.fn();
    
    render(<UserPostsList posts={[]} onDelete={mockOnDelete} />);
    expect(screen.getByText("Vous n'avez publié aucun item.")).toBeInTheDocument();
  });

  it("affiche correctement les titres des items", () => {
    const mockOnDelete = vi.fn();
    const mockPosts = [
      { id: "1", titre: "iPhone 13" },
      { id: "2", titre: "MacBook Pro" }
    ];

    render(<UserPostsList posts={mockPosts} onDelete={mockOnDelete} />);
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
    expect(screen.queryByText("Vous n'avez publié aucun item.")).not.toBeInTheDocument();
  });

  it("appelle la fonction onDelete avec le bon ID lorsqu'on clique sur supprimer", () => {
    const mockOnDelete = vi.fn();
    const mockPosts = [
      { id: "1", titre: "iPhone 13" }
    ];
    render(<UserPostsList posts={mockPosts} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole("button", { name: "Supprimer iPhone 13" });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
