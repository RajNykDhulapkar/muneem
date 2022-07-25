import { NotFoundException } from "@nestjs/common";
import transformCase from "../utils/transformCase";

class ResourceNotFoundException extends NotFoundException {
    constructor(name: string, id?: number) {
        if (id) {
            super(`${transformCase(name)} with the id ${id} not found`);
        } else {
            super(`${transformCase(name)} not found`);
        }
    }
}

export default ResourceNotFoundException;
