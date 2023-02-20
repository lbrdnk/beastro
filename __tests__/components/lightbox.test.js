import { render, screen, waitFor } from "@testing-library/react";
import { boxFittingDimensions } from "../../components/lightbox.js";
import "@testing-library/jest-dom";

describe("dimensionsToFitBox", () => {
    it("works for", () => {
        // console.log(boxFittingDimensions)
        // console.log(boxFittingDimensions(100, 200, 300, 400))

        // console.log(boxFittingDimensions(100, 200, 400, 1))

        // wrong -- 0.x vs n.x
        // console.log(boxFittingDimensions(100, 200, 100, 1))

        // expect.closeTo
        expect(1).toBe(1)

    })
})