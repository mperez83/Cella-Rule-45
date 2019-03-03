// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

var cells = [
  [],
  []
];

// FUN. Draw filled rect.
function draw_rect(ctx, stroke, fill) {
  stroke = stroke || 'lightgrey';
  fill = fill || 'dimgrey';
  ctx.save();
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.lineWidth = 5;
  ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

// =====================================================  draw_grid ====
function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
  rctx.save();
  rctx.strokeStyle = rstroke;
  rctx.fillStyle = rfill;
  let width = rctx.canvas.width;
  let height = rctx.canvas.height;

  for (var ix = 0; ix < width; ix += rminor) {
    rctx.beginPath();
    rctx.moveTo(ix, 0);
    rctx.lineTo(ix, height);
    rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
    rctx.stroke();
    if (ix % rmajor == 0) {
      rctx.fillText(ix, ix, 10);
    }
  }
  for (var iy = 0; iy < height; iy += rminor) {
    rctx.beginPath();
    rctx.moveTo(0, iy);
    rctx.lineTo(width, iy);
    rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
    rctx.stroke();
    if (iy % rmajor == 0) {
      rctx.fillText(iy, 0, iy + 10);
    }
  }

  rctx.restore();
}

function draw_cells(rctx) {

  let width = rctx.canvas.width;
  let height = rctx.canvas.height;

  //Create nodes
  for (let row = 0; row < height; row++) {
    if (!cells[row]) cells[row] = [];
    for (let col = 0; col < width; col++) {
      cells[row][col] = {
        state: 0,
        xPos: col,
        yPos: row
      };
    }
  }

  //Manually set the top center cell to state 1
  cells[0][200].state = 1;

  //Apply rule 45 to all 400 rows
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {

      let leftState = 0;
      let centerState = 0;
      let rightState = 0;

      //Find the leftState
      //If we're in the first column of the row, the left state is automatically 0
      if (col == 0) {
        leftState = 0;
      }
      //Else, the left state is the state of the node to the left of the current one
      else {
        leftState = cells[row][col - 1].state;
      }

      //Find the centerState
      centerState = cells[row][col].state;

      //Find the rightState
      //If we're in the last column of the row, the right state is automatically 0
      if (col == (cells[row].length - 1)) {
        rightState = 0;
      }
      //Else, the right state is the state of the node to the right of the current one
      else {
        rightState = cells[row][col + 1].state;
      }



      //Use the three states to apply rule 45 to the node below the current one
      //(as long as we aren't on the bottom row)
      if (row != (cells[row].length - 1)) {

        //Orientation: 111
        if (leftState == 1 && centerState == 1 && rightState == 1) {
          cells[row + 1][col].state = 0;
        }

        //Orientation: 110
        else if (leftState == 1 && centerState == 1 && rightState == 0) {
          cells[row + 1][col].state = 0;
        }

        //Orientation: 101
        else if (leftState == 1 && centerState == 0 && rightState == 1) {
          cells[row + 1][col].state = 1;
        }

        //Orientation: 100
        else if (leftState == 1 && centerState == 0 && rightState == 0) {
          cells[row + 1][col].state = 0;
        }

        //Orientation: 011
        else if (leftState == 0 && centerState == 1 && rightState == 1) {
          cells[row + 1][col].state = 1;
        }

        //Orientation: 010
        else if (leftState == 0 && centerState == 1 && rightState == 0) {
          cells[row + 1][col].state = 1;
        }

        //Orientation: 001
        else if (leftState == 0 && centerState == 0 && rightState == 1) {
          cells[row + 1][col].state = 0;
        }

        //Orientation: 000
        else if (leftState == 0 && centerState == 0 && rightState == 0) {
          cells[row + 1][col].state = 1;
        }

      }

    }
  }

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      rctx.fillStyle = (cells[row][col].state == 0) ? "white" : "black";
      rctx.fillRect(col, row, 1, 1);
    }
  }

}

function draw_title(context) {
  context.save();
  context.fillStyle = 'lightgrey';
  context.font = "30px Arial";
  context.fillText("Grid", 150, 140);
  context.restore();
}
