import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../pages/index";
import "@testing-library/jest-dom";

const imgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";

describe("Home", () => {
  it("renders a heading", async () => {
    const { container } = render(
      <Home
        indexFlyer={{
          width: 848,
          height: 636,
          url: imgUrl,
        }}
        // imgProps={{priority: true}}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(imgUrl))
      );
    });

    //
    // expect(1).toBe(1)
    // const image = document.querySelectorAll("img");
    // // console.log(Object.keys(image))

    // console.log(container.querySelector("img"));
    // console.log(screen.getByRole("img", { src: url }));
    // console.log(
    //   decodeURIComponent(screen.getByRole("img", { src: imgUrl }).src)
    // );

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
  });
});
