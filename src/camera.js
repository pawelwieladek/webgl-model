function Camera() {
    this.viewMatrix = mat4.create();
    this.position = vec3.fromValues(0.0, 0.0, 0.0);
    this.tangent = vec3.fromValues(1.0, 0.0, 0.0);
    this.forward = vec3.fromValues(0.0, 0.0, 1.0);
    this.up = vec3.fromValues(0.0, 1.0, 0.0);
    this.translateStep = 0.05;
    this.rotateStep = Math.PI / 180;
    this.pitchAngle = 0.0;
    this.yawAngle = 0.0;
}

Camera.prototype = {
    setPosition: function(position) {
        this.position = position;
    },
    getViewMatrix: function() {
        var rotationMatrix = mat4.create();
        var direction = vec3.fromValues(0.0, 0.0, -1.0);
        var tangent = vec3.fromValues(1.0, 0.0, 0.0);
        var forward = vec3.fromValues(0.0, 0.0, 1.0);
        mat4.rotateX(rotationMatrix, rotationMatrix, this.pitchAngle);
        vec3.transformMat4(direction, direction, rotationMatrix);
        vec3.transformMat4(forward, forward, rotationMatrix);
        vec3.transformMat4(tangent, tangent, rotationMatrix);
        mat4.identity(rotationMatrix);
        mat4.rotateY(rotationMatrix, rotationMatrix, this.yawAngle);
        vec3.transformMat4(direction, direction, rotationMatrix);
        vec3.transformMat4(forward, forward, rotationMatrix);
        vec3.transformMat4(tangent, tangent, rotationMatrix);
        this.tangent = tangent;
        this.forward = forward;
        vec3.add(direction, direction, this.position);

        mat4.lookAt(this.viewMatrix, this.position, direction, this.up);
        return this.viewMatrix;
    },
    moveUp: function() {
        var forward = vec3.create();
        vec3.scale(forward, this.forward, -this.translateStep);
        vec3.add(this.position, this.position, forward);
    },
    moveDown: function() {
        var forward = vec3.create();
        vec3.scale(forward, this.forward, this.translateStep);
        vec3.add(this.position, this.position, forward);
    },
    moveLeft: function() {
        var tangent = vec3.create();
        vec3.scale(tangent, this.tangent, -this.translateStep);
        vec3.add(this.position, this.position, tangent);
    },
    moveRight: function() {
        var tangent = vec3.create();
        vec3.scale(tangent, this.tangent, this.translateStep);
        vec3.add(this.position, this.position, tangent);
    },
    rotatePitchMinus: function() {
        this.pitchAngle -= this.rotateStep;
    },
    rotatePitchPlus: function() {
        this.pitchAngle += this.rotateStep;
    },
    rotateYawMinus: function() {
        this.yawAngle += this.rotateStep;
    },
    rotateYawPlus: function() {
        this.yawAngle -= this.rotateStep;
    }
};