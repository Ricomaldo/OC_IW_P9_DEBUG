import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const mockData = {
  events: [
    {
      "id": 1,
      "type": "conférence",
      "date": "2022-04-29T20:28:45.744Z",
      "title": "User&product MixUsers",
      "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      "description": "Présentation des nouveaux usages UX.",
      "nb_guesses": 900,
      "periode": "14-15-16 Avril",
      "prestations": [
        "1 espace d'exposition",
        "1 scéne principale",
        "1 espace de restaurations"
      ]
    },
    {
      "id": 2,
      "type": "expérience digitale",
      "date": "2022-01-29T20:28:45.744Z",
      "title": "#DigitonPARIS",
      "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 espace d'exposition",
        "1 scéne principale",
        "1 site web dédié"
      ]
    },
    {
      "id": 3,
      "type": "conférence",
      "date": "2022-03-29T20:28:45.744Z",
      "title": "Conférence &co-responsable",
      "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
      "description": "Débats et échanges autour des collaborations eco-responsable.",
      "nb_guesses": 600,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 scéne principale",
        "1 espaces de restaurations",
        "1 site web dédié"
      ]
    }
  ],
  "focus": [
    {
      "title": "World economic forum",
      "description": "Oeuvre à la coopération entre le secteur public et le privé.",
      "date": "2022-01-29T20:28:45.744Z",
      "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
      "title": "Nordic design week",
      "description": "Conférences sur le design de demain dans le digital",
      "date": "2022-03-29T20:28:45.744Z",
      "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
  ]
}

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
  beforeEach(() => {
    api.loadData = jest.fn().mockResolvedValue(mockData);
  });

  it("a list of events is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Catégories");
  });

  it("a list of people is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Samira");
  });

  it("a footer is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Contactez-nous");
  });

  it("an event card, with the last event, is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");

    const vignette = await screen.findByTestId("last-event-vignette");
    const eventCard = within(vignette).getByTestId("card-testid");

    expect(eventCard).toHaveTextContent("User&product MixUsers");
    const eventImage = eventCard.querySelector('img');
    expect(eventImage).toHaveAttribute("src", "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png");
    expect(eventImage).toHaveAttribute("alt", "User&product MixUsers");
    expect(eventCard).toHaveTextContent("avril");


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

describe("Carrousel avec transition automatique", () => {
  it("affiche les slides dans l'ordre avec une transition automatique", async () => {
    jest.useFakeTimers();

    api.loadData = jest.fn().mockResolvedValue(mockData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await screen.findByText("Catégories");

    const firstSlide = screen.getByText("World economic forum");
    expect(firstSlide).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    const secondSlide = screen.getByText("Nordic design week");
    expect(secondSlide).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    expect(firstSlide).toBeInTheDocument();

    jest.useRealTimers();
  });
});