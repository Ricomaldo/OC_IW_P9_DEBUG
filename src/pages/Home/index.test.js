import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const mockData = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d'exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d'exposition", "1 scéne principale"],
    }
  ],
  focus: [
    {
      id: 1,
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur"
    },
    {
      id: 2,
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur"
    }
  ]
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email *");
    await screen.findByText("Nom *");
    await screen.findByText("Prénom *");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Catégories");
  });

  it("a list of people is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Samira");
  });

  it("a footer is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Contactez-nous");
  });

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Notre derniére prestation");
  });
});

describe("Navigation via la Navbar", () => {
  beforeEach(() => {
    api.loadData = jest.fn().mockReturnValue(mockData);
  });

  it("affiche la section services lors du clic sur 'Nos services'", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");
    fireEvent.click(screen.getByRole("link", { name: "Nos services" }));
    expect(screen.getByTestId("services")).toBeVisible();
  });

  it("affiche la section events lors du clic sur 'Nos réalisations'", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");
    fireEvent.click(screen.getByRole("link", { name: "Nos réalisations" }));
    expect(screen.getByTestId("realisations")).toBeVisible();
  });

  it("affiche la section team lors du clic sur 'Notre équipe'", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");
    fireEvent.click(screen.getByRole("link", { name: "Notre équipe" }));
    expect(screen.getByTestId("equipe")).toBeVisible();
  });

  it("affiche la section contact lors du clic sur 'Contact'", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));
    expect(screen.getByTestId("contact")).toBeVisible();
  });
});